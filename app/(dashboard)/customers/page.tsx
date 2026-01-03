'use client'

import { useState, useEffect, useMemo } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import Link from 'next/link'

interface CustomerRow {
  id: string
  fullName: string
  email: string | null
  phone: string | null
  totalOrders: number
  lifetimeValue: number
  lastOrderDate: Date | null
  isVip: boolean
  vipTier: string | null
  emailConsent: boolean
  sources: string[]
}

interface CustomerStats {
  totalCustomers: number
  totalLtv: number
  avgLtv: number
  vipCount: number
  emailSubscribers: number
}

export default function CustomersPage() {
  const { organization } = useOrganization()
  const { addToast } = useToast()

  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Filters
  const [filterSource, setFilterSource] = useState<string>('all')
  const [filterVip, setFilterVip] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('fullName')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Stats
  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    totalLtv: 0,
    avgLtv: 0,
    vipCount: 0,
    emailSubscribers: 0,
  })

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Load customers
  useEffect(() => {
    async function loadCustomers() {
      if (!organization?.id) return

      setLoading(true)
      try {
        const customersRef = collection(db, 'organizations', organization.id, 'customers')

        // Simple query - sort by fullName to avoid needing composite indexes
        const q = query(
          customersRef,
          orderBy('fullName', 'asc'),
          limit(200)
        )

        const snapshot = await getDocs(q)

        const customerData: CustomerRow[] = snapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Unknown',
            email: data.email,
            phone: data.phone,
            totalOrders: data.metrics?.totalOrders || 0,
            lifetimeValue: data.metrics?.lifetimeValue || 0,
            lastOrderDate: data.metrics?.lastOrderDate?.toDate() || null,
            isVip: data.isVip || data.status?.isVip || false,
            vipTier: data.vipTier || data.status?.vipTier || null,
            emailConsent: data.emailConsent || data.klaviyo?.emailConsent || data.shopify?.acceptsMarketing || false,
            sources: data.sources || [],
          }
        })

        setCustomers(customerData)

        // Calculate stats from loaded data
        const totalLtv = customerData.reduce((sum, c) => sum + c.lifetimeValue, 0)

        setStats({
          totalCustomers: customerData.length,
          totalLtv,
          avgLtv: customerData.length > 0 ? totalLtv / customerData.length : 0,
          vipCount: customerData.filter(c => c.isVip).length,
          emailSubscribers: customerData.filter(c => c.emailConsent).length,
        })
      } catch (err: any) {
        console.error('Error loading customers:', err)
        addToast('error', err.message || 'Failed to load customers')
      } finally {
        setLoading(false)
      }
    }

    loadCustomers()
  }, [organization?.id, addToast])

  // Filter and sort customers client-side
  const filteredCustomers = useMemo(() => {
    let result = [...customers]

    // Search filter
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase()
      result = result.filter(c =>
        c.fullName.toLowerCase().includes(search) ||
        c.email?.toLowerCase().includes(search) ||
        c.phone?.includes(search)
      )
    }

    // Source filter
    if (filterSource !== 'all') {
      result = result.filter(c => c.sources.includes(filterSource))
    }

    // VIP filter
    if (filterVip === 'vip') {
      result = result.filter(c => c.isVip)
    } else if (filterVip === 'regular') {
      result = result.filter(c => !c.isVip)
    }

    // Sort client-side
    result.sort((a, b) => {
      let aVal: any, bVal: any
      switch (sortBy) {
        case 'lifetimeValue':
          aVal = a.lifetimeValue
          bVal = b.lifetimeValue
          break
        case 'orders':
          aVal = a.totalOrders
          bVal = b.totalOrders
          break
        case 'lastOrder':
          aVal = a.lastOrderDate?.getTime() || 0
          bVal = b.lastOrderDate?.getTime() || 0
          break
        default:
          aVal = a.fullName.toLowerCase()
          bVal = b.fullName.toLowerCase()
      }
      if (sortOrder === 'desc') {
        return bVal > aVal ? 1 : bVal < aVal ? -1 : 0
      }
      return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
    })

    return result
  }, [customers, debouncedSearch, filterSource, filterVip, sortBy, sortOrder])

  // Sync customers
  const handleSync = async () => {
    if (!organization?.id) return

    setSyncing(true)
    try {
      const response = await fetch('/api/customers/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId: organization.id }),
      })

      const data = await response.json()
      if (data.success) {
        addToast('success', `Synced ${data.count} customers from Shopify & Klaviyo`)
        // Reload customers
        window.location.reload()
      } else {
        throw new Error(data.error)
      }
    } catch (err: any) {
      console.error('Sync error:', err)
      addToast('error', err.message || 'Failed to sync customers')
    } finally {
      setSyncing(false)
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: organization?.settings?.currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (date: Date | null) => {
    if (!date) return '-'
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  // Get VIP tier badge
  const getVipBadge = (tier: string | null) => {
    if (!tier) return null
    const colors: Record<string, string> = {
      bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      silver: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
      gold: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      platinum: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    }
    return colors[tier] || colors.bronze
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-slate-400">Unified customer data from Shopify & Klaviyo</p>
        </div>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50 flex items-center gap-2"
        >
          {syncing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Syncing...
            </>
          ) : (
            <>
              <i className="fas fa-sync"></i>
              Sync Customers
            </>
          )}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total Customers</div>
          <div className="text-2xl font-bold text-white">{stats.totalCustomers.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Total LTV</div>
          <div className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.totalLtv)}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Avg. LTV</div>
          <div className="text-2xl font-bold text-white">{formatCurrency(stats.avgLtv)}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">VIP Customers</div>
          <div className="text-2xl font-bold text-amber-400">{stats.vipCount}</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-sm mb-1">Email Subscribers</div>
          <div className="text-2xl font-bold text-purple-400">{stats.emailSubscribers}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, or phone..."
                className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Source Filter */}
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Sources</option>
            <option value="shopify">Shopify Only</option>
            <option value="klaviyo">Klaviyo Only</option>
          </select>

          {/* VIP Filter */}
          <select
            value={filterVip}
            onChange={(e) => setFilterVip(e.target.value)}
            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Customers</option>
            <option value="vip">VIP Only</option>
            <option value="regular">Regular Only</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-')
              setSortBy(field)
              setSortOrder(order as 'asc' | 'desc')
            }}
            className="bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="lifetimeValue-desc">Highest LTV</option>
            <option value="lifetimeValue-asc">Lowest LTV</option>
            <option value="orders-desc">Most Orders</option>
            <option value="lastOrder-desc">Recent Orders</option>
            <option value="name-asc">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-8 text-center">
            <i className="fas fa-users text-4xl text-slate-600 mb-3"></i>
            <p className="text-slate-400 mb-4">
              {customers.length === 0 ? 'No customers found' : 'No customers match your filters'}
            </p>
            {customers.length === 0 && (
              <button
                onClick={handleSync}
                disabled={syncing}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50"
              >
                Sync from Shopify & Klaviyo
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm">Customer</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm">Contact</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm text-center">Orders</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm text-right">Lifetime Value</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm">Last Order</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm text-center">Source</th>
                  <th className="px-4 py-3 text-slate-400 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white font-medium">
                          {customer.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {customer.fullName}
                            {customer.isVip && customer.vipTier && (
                              <span className={`px-1.5 py-0.5 text-xs rounded border ${getVipBadge(customer.vipTier)}`}>
                                {customer.vipTier.toUpperCase()}
                              </span>
                            )}
                            {customer.isVip && !customer.vipTier && (
                              <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded">
                                VIP
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm space-y-0.5">
                        {customer.email && (
                          <div className="text-slate-300 flex items-center gap-1.5">
                            <i className="fas fa-envelope text-xs text-slate-500 w-3"></i>
                            <span className="truncate max-w-[200px]">{customer.email}</span>
                            {customer.emailConsent && (
                              <i className="fas fa-check-circle text-xs text-emerald-400" title="Subscribed"></i>
                            )}
                          </div>
                        )}
                        {customer.phone && (
                          <div className="text-slate-400 flex items-center gap-1.5">
                            <i className="fas fa-phone text-xs text-slate-500 w-3"></i>
                            {customer.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-white font-medium">{customer.totalOrders}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-emerald-400 font-semibold">
                        {formatCurrency(customer.lifetimeValue)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-400 text-sm">
                        {formatDate(customer.lastOrderDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {customer.sources.includes('shopify') && (
                          <span className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center" title="Shopify">
                            <i className="fab fa-shopify text-green-400 text-xs"></i>
                          </span>
                        )}
                        {customer.sources.includes('klaviyo') && (
                          <span className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center" title="Klaviyo">
                            <span className="text-purple-400 text-xs font-bold">K</span>
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/customers/${customer.id}`}
                        className="px-3 py-1.5 text-sm text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && filteredCustomers.length > 0 && (
        <div className="mt-4 text-sm text-slate-400 text-center">
          Showing {filteredCustomers.length} of {stats.totalCustomers} customers
        </div>
      )}
    </div>
  )
}
