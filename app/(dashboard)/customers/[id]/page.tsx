'use client'

import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc, collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Order {
  id: string
  orderNumber: string
  createdAt: Date
  total: number
  status: string
  fulfillmentStatus: string
  itemCount: number
}

interface Activity {
  id: string
  type: string
  title: string
  description: string | null
  source: string
  createdAt: Date
}

export default function CustomerDetailPage() {
  const { organization } = useOrganization()
  const params = useParams()
  const customerId = params.id as string

  const [customer, setCustomer] = useState<any>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'activity' | 'marketing'>('overview')

  // Load customer data
  useEffect(() => {
    async function loadCustomer() {
      if (!organization?.id || !customerId) return

      try {
        // Get customer
        const customerDoc = await getDoc(
          doc(db, 'organizations', organization.id, 'customers', customerId)
        )

        if (customerDoc.exists()) {
          const data = customerDoc.data()
          const customerData = { id: customerDoc.id, ...data }
          setCustomer(customerData)

          // Get orders for this customer by email
          if (data?.email) {
            const ordersQuery = query(
              collection(db, 'organizations', organization.id, 'orders'),
              where('customer.email', '==', data.email),
              orderBy('createdAt', 'desc'),
              limit(50)
            )

            try {
              const ordersSnap = await getDocs(ordersQuery)
              const customerOrders = ordersSnap.docs.map(d => ({
                id: d.id,
                orderNumber: d.data().orderNumber || d.data().name,
                createdAt: d.data().createdAt?.toDate(),
                total: d.data().totalPrice || d.data().total || 0,
                status: d.data().financialStatus || 'pending',
                fulfillmentStatus: d.data().fulfillmentStatus || 'unfulfilled',
                itemCount: d.data().lineItems?.length || 0,
              }))
              setOrders(customerOrders)
            } catch (err) {
              // Index might not exist yet
              console.log('Orders query needs index, falling back to all orders')
            }
          }

          // Get activity
          try {
            const activitySnap = await getDocs(
              query(
                collection(db, 'organizations', organization.id, 'customers', customerId, 'activity'),
                orderBy('createdAt', 'desc'),
                limit(50)
              )
            )
            setActivity(activitySnap.docs.map(d => ({
              id: d.id,
              type: d.data().type,
              title: d.data().title,
              description: d.data().description,
              source: d.data().source,
              createdAt: d.data().createdAt?.toDate(),
            })))
          } catch (err) {
            // Activity collection might not exist
            console.log('No activity found')
          }
        }
      } catch (err) {
        console.error('Error loading customer:', err)
      } finally {
        setLoading(false)
      }
    }

    loadCustomer()
  }, [organization?.id, customerId])

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: organization?.settings?.currency || 'USD',
    }).format(amount)
  }

  // Format date
  const formatDate = (date: any) => {
    if (!date) return '-'
    const d = date.toDate ? date.toDate() : new Date(date)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(d)
  }

  // Get VIP tier badge
  const getVipTierBadge = (tier: string | null) => {
    if (!tier) return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
    const colors: Record<string, string> = {
      bronze: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      silver: 'bg-slate-400/20 text-slate-300 border-slate-400/30',
      gold: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      platinum: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    }
    return colors[tier] || colors.bronze
  }

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  if (!customer) {
    return (
      <div className="p-6 text-center">
        <i className="fas fa-user-slash text-4xl text-slate-600 mb-3"></i>
        <p className="text-slate-400 mb-4">Customer not found</p>
        <Link href="/customers" className="text-emerald-400 hover:underline">
          Back to Customers
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link href="/customers" className="text-slate-400 hover:text-white text-sm mb-2 inline-flex items-center gap-1">
          <i className="fas fa-arrow-left text-xs"></i>
          Back to Customers
        </Link>

        <div className="flex items-start justify-between mt-2">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center text-white text-2xl font-medium">
              {customer.fullName?.charAt(0).toUpperCase() || '?'}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{customer.fullName}</h1>
                {customer.status?.isVip && (
                  <span className={`px-2 py-0.5 text-sm rounded-full border ${getVipTierBadge(customer.status.vipTier)}`}>
                    {customer.status.vipTier ? customer.status.vipTier.toUpperCase() : 'VIP'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                {customer.email && (
                  <span className="flex items-center gap-1.5">
                    <i className="fas fa-envelope"></i>
                    {customer.email}
                  </span>
                )}
                {customer.phone && (
                  <span className="flex items-center gap-1.5">
                    <i className="fas fa-phone"></i>
                    {customer.phone}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Source Badges */}
          <div className="flex items-center gap-2">
            {customer.sources?.includes('shopify') && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm flex items-center gap-1.5 border border-green-500/30">
                <i className="fab fa-shopify"></i>
                Shopify
              </span>
            )}
            {customer.sources?.includes('klaviyo') && (
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm flex items-center gap-1.5 border border-purple-500/30">
                <span className="font-bold">K</span>
                Klaviyo
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">Lifetime Value</div>
          <div className="text-xl font-bold text-emerald-400">
            {formatCurrency(customer.metrics?.lifetimeValue || 0)}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">Total Orders</div>
          <div className="text-xl font-bold text-white">
            {customer.metrics?.totalOrders || 0}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">Avg. Order</div>
          <div className="text-xl font-bold text-white">
            {formatCurrency(customer.metrics?.averageOrderValue || 0)}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">First Order</div>
          <div className="text-lg font-bold text-white">
            {formatDate(customer.metrics?.firstOrderDate)}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">Last Order</div>
          <div className="text-lg font-bold text-white">
            {formatDate(customer.metrics?.lastOrderDate)}
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="text-slate-400 text-xs mb-1">Days Since Order</div>
          <div className="text-xl font-bold text-white">
            {customer.metrics?.daysSinceLastOrder ?? '-'}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-700 mb-6">
        <div className="flex gap-6">
          {['overview', 'orders', 'marketing', 'activity'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Recent Orders */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
                  {orders.length > 0 && (
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-sm text-emerald-400 hover:underline"
                    >
                      View All ({orders.length})
                    </button>
                  )}
                </div>

                {orders.length === 0 ? (
                  <p className="text-slate-400 text-center py-4">No orders yet</p>
                ) : (
                  <div className="space-y-2">
                    {orders.slice(0, 5).map((order) => (
                      <Link
                        key={order.id}
                        href={`/orders/${order.id}`}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-900 transition-colors"
                      >
                        <div>
                          <div className="text-white font-medium">#{order.orderNumber}</div>
                          <div className="text-sm text-slate-400">{formatDate(order.createdAt)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-medium">{formatCurrency(order.total)}</div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className={`px-1.5 py-0.5 rounded ${
                              order.fulfillmentStatus === 'fulfilled'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}>
                              {order.fulfillmentStatus}
                            </span>
                            <span className="text-slate-500">{order.itemCount} items</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Klaviyo Engagement */}
              {customer.klaviyo && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Email Engagement</h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">{customer.klaviyo.emailsReceived || 0}</div>
                      <div className="text-xs text-slate-400">Emails Received</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-white">{customer.klaviyo.emailsOpened || 0}</div>
                      <div className="text-xs text-slate-400">Emails Opened</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-emerald-400">
                        {((customer.klaviyo.openRate || 0) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-slate-400">Open Rate</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {((customer.klaviyo.clickRate || 0) * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-slate-400">Click Rate</div>
                    </div>
                  </div>

                  {/* Consent Status */}
                  <div className="mt-4 flex gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${
                      customer.klaviyo.emailConsent
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      <i className={`fas fa-${customer.klaviyo.emailConsent ? 'check' : 'times'}`}></i>
                      Email {customer.klaviyo.emailConsent ? 'Subscribed' : 'Unsubscribed'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-1.5 ${
                      customer.klaviyo.smsConsent
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      <i className={`fas fa-${customer.klaviyo.smsConsent ? 'check' : 'times'}`}></i>
                      SMS {customer.klaviyo.smsConsent ? 'Subscribed' : 'Not Subscribed'}
                    </span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <i className="fas fa-shopping-cart text-3xl mb-2"></i>
                  <p>No orders found</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700 text-left">
                      <th className="px-4 py-3 text-slate-400 font-medium text-sm">Order</th>
                      <th className="px-4 py-3 text-slate-400 font-medium text-sm">Date</th>
                      <th className="px-4 py-3 text-slate-400 font-medium text-sm">Status</th>
                      <th className="px-4 py-3 text-slate-400 font-medium text-sm text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                        <td className="px-4 py-3">
                          <Link href={`/orders/${order.id}`} className="text-emerald-400 hover:underline font-medium">
                            #{order.orderNumber}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-sm">{formatDate(order.createdAt)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded text-xs ${
                            order.fulfillmentStatus === 'fulfilled'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}>
                            {order.fulfillmentStatus}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right text-white font-medium">{formatCurrency(order.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Marketing Tab */}
          {activeTab === 'marketing' && (
            <div className="space-y-6">
              {customer.klaviyo ? (
                <>
                  {/* Lists & Segments */}
                  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Lists & Segments</h2>
                    <div className="flex flex-wrap gap-2">
                      {customer.klaviyo.lists?.map((list: string) => (
                        <span key={list} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                          {list}
                        </span>
                      ))}
                      {customer.klaviyo.segments?.map((segment: string) => (
                        <span key={segment} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                          {segment}
                        </span>
                      ))}
                      {!customer.klaviyo.lists?.length && !customer.klaviyo.segments?.length && (
                        <p className="text-slate-400">No lists or segments</p>
                      )}
                    </div>
                  </div>

                  {/* Predictive Analytics */}
                  {(customer.klaviyo.predictedLtv || customer.klaviyo.churnRisk) && (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                      <h2 className="text-lg font-semibold text-white mb-4">Predictive Analytics</h2>
                      <div className="grid grid-cols-3 gap-4">
                        {customer.klaviyo.predictedLtv && (
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="text-slate-400 text-xs mb-1">Predicted LTV</div>
                            <div className="text-xl font-bold text-emerald-400">
                              {formatCurrency(customer.klaviyo.predictedLtv)}
                            </div>
                          </div>
                        )}
                        {customer.klaviyo.churnRisk && (
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="text-slate-400 text-xs mb-1">Churn Risk</div>
                            <div className={`text-xl font-bold ${
                              customer.klaviyo.churnRisk === 'low' ? 'text-emerald-400' :
                              customer.klaviyo.churnRisk === 'medium' ? 'text-amber-400' : 'text-red-400'
                            }`}>
                              {customer.klaviyo.churnRisk.charAt(0).toUpperCase() + customer.klaviyo.churnRisk.slice(1)}
                            </div>
                          </div>
                        )}
                        {customer.klaviyo.predictedNextOrder && (
                          <div className="bg-slate-900/50 rounded-lg p-4">
                            <div className="text-slate-400 text-xs mb-1">Predicted Next Order</div>
                            <div className="text-lg font-bold text-white">
                              {formatDate(customer.klaviyo.predictedNextOrder)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 text-center">
                  <i className="fas fa-envelope text-4xl text-slate-600 mb-3"></i>
                  <p className="text-slate-400 mb-2">No Klaviyo data</p>
                  <p className="text-slate-500 text-sm">Connect Klaviyo to see email marketing data</p>
                </div>
              )}
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Activity Timeline</h2>

              {activity.length === 0 ? (
                <p className="text-slate-400 text-center py-4">No activity recorded</p>
              ) : (
                <div className="space-y-4">
                  {activity.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        item.type === 'order' ? 'bg-emerald-500/20 text-emerald-400' :
                        item.type.includes('email') ? 'bg-purple-500/20 text-purple-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>
                        <i className={`fas fa-${
                          item.type === 'order' ? 'shopping-cart' :
                          item.type === 'email_opened' ? 'envelope-open' :
                          item.type === 'email_clicked' ? 'mouse-pointer' :
                          item.type === 'email_sent' ? 'paper-plane' :
                          'circle'
                        } text-xs`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm">{item.title}</div>
                        {item.description && (
                          <div className="text-slate-400 text-xs mt-0.5">{item.description}</div>
                        )}
                        <div className="text-slate-500 text-xs mt-1">
                          {formatDate(item.createdAt)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Customer Info</h2>

            {customer.defaultAddress && (
              <div className="mb-4">
                <div className="text-slate-400 text-xs mb-1">Default Address</div>
                <div className="text-white text-sm">
                  {customer.defaultAddress.address1}<br />
                  {customer.defaultAddress.address2 && <>{customer.defaultAddress.address2}<br /></>}
                  {customer.defaultAddress.city}, {customer.defaultAddress.provinceCode} {customer.defaultAddress.zip}<br />
                  {customer.defaultAddress.country}
                </div>
              </div>
            )}

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer Since</span>
                <span className="text-white">{formatDate(customer.shopify?.createdAt || customer.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Accepts Marketing</span>
                <span className={customer.shopify?.acceptsMarketing ? 'text-emerald-400' : 'text-slate-500'}>
                  {customer.shopify?.acceptsMarketing ? 'Yes' : 'No'}
                </span>
              </div>
              {customer.shopify?.taxExempt !== undefined && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Tax Exempt</span>
                  <span className="text-white">{customer.shopify.taxExempt ? 'Yes' : 'No'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Risk Indicator */}
          {customer.status?.riskLevel && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Risk Assessment</h2>
              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                customer.status.riskLevel === 'low' ? 'bg-emerald-500/10 border border-emerald-500/30' :
                customer.status.riskLevel === 'medium' ? 'bg-amber-500/10 border border-amber-500/30' :
                'bg-red-500/10 border border-red-500/30'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  customer.status.riskLevel === 'low' ? 'bg-emerald-500/20 text-emerald-400' :
                  customer.status.riskLevel === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  <i className={`fas fa-${
                    customer.status.riskLevel === 'low' ? 'shield-check' :
                    customer.status.riskLevel === 'medium' ? 'exclamation-triangle' :
                    'exclamation-circle'
                  }`}></i>
                </div>
                <div>
                  <div className={`font-medium ${
                    customer.status.riskLevel === 'low' ? 'text-emerald-400' :
                    customer.status.riskLevel === 'medium' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>
                    {customer.status.riskLevel.charAt(0).toUpperCase() + customer.status.riskLevel.slice(1)} Risk
                  </div>
                  <div className="text-xs text-slate-400">Churn probability</div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {customer.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-sm">
                  {tag}
                </span>
              ))}
              {customer.shopify?.tags?.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                  {tag}
                </span>
              ))}
              {!customer.tags?.length && !customer.shopify?.tags?.length && (
                <p className="text-slate-400 text-sm">No tags</p>
              )}
            </div>
          </div>

          {/* Notes */}
          {customer.shopify?.note && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Notes</h2>
              <p className="text-slate-300 text-sm whitespace-pre-wrap">{customer.shopify.note}</p>
            </div>
          )}

          {/* External Links */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">External Links</h2>
            <div className="space-y-2">
              {customer.shopify?.customerId && (
                <a
                  href={`https://admin.shopify.com/store/customers/${customer.shopify.customerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-colors text-sm"
                >
                  <i className="fab fa-shopify"></i>
                  View in Shopify
                  <i className="fas fa-external-link-alt text-xs ml-auto"></i>
                </a>
              )}
              {customer.klaviyo?.profileId && (
                <a
                  href={`https://www.klaviyo.com/profile/${customer.klaviyo.profileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-colors text-sm"
                >
                  <span className="font-bold">K</span>
                  View in Klaviyo
                  <i className="fas fa-external-link-alt text-xs ml-auto"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
