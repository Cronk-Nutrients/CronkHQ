'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Package,
  ShoppingCart,
  Download,
  FileText,
  Calendar,
  Store,
  Percent,
  Truck,
} from 'lucide-react'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'
import { usePermissions } from '@/hooks/usePermissions'
import { useCurrency } from '@/hooks/useCurrency'
import { useToast } from '@/components/ui/Toast'

type DateRangeType = 'today' | 'wtd' | 'mtd' | 'ytd' | 'custom'
type ReportType = 'profitability' | 'channel' | 'product' | 'shipping'

interface Order {
  id: string
  total: number
  cogs: number
  profit: number
  margin: number
  shipping: number
  channel: string
  status: string
  fulfillmentStatus: string
  createdAt: Date
  items: Array<{
    productId: string
    productName: string
    sku: string
    quantity: number
    price: number
  }>
}

interface Product {
  id: string
  name: string
  sku: string
  cost: number
  totalStock: number
  lowStockThreshold: number
}

export default function ReportsPage() {
  const { organization } = useOrganization()
  const { canViewCosts, canViewFinancials } = usePermissions()
  const { formatCurrency, baseCurrency } = useCurrency()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [dateRange, setDateRange] = useState<DateRangeType>('mtd')
  const [customStart, setCustomStart] = useState<string>('')
  const [customEnd, setCustomEnd] = useState<string>('')
  const [currentReport, setCurrentReport] = useState<ReportType>('profitability')

  // Load data from Firestore
  useEffect(() => {
    if (!organization?.id) return

    const loadData = async () => {
      setLoading(true)
      try {
        const orgId = organization.id

        // Fetch products
        const productsRef = collection(db, 'organizations', orgId, 'products')
        const productsSnap = await getDocs(productsRef)
        const productsData = productsSnap.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            name: data.name || '',
            sku: data.sku || '',
            cost: data.cost || 0,
            totalStock: data.totalStock || 0,
            lowStockThreshold: data.lowStockThreshold || 10,
          }
        })
        setProducts(productsData)

        // Fetch orders
        const ordersRef = collection(db, 'organizations', orgId, 'orders')
        const ordersSnap = await getDocs(ordersRef)
        const ordersData = ordersSnap.docs.map(doc => {
          const data = doc.data()
          const items = data.lineItems || data.items || []
          const total = data.total || data.totalPrice || 0
          const shipping = data.shipping || data.shippingPrice || 0

          // Calculate COGS from items
          let cogs = 0
          items.forEach((item: any) => {
            const product = productsData.find(p => p.id === item.productId || p.sku === item.sku)
            const itemCost = item.cost || product?.cost || 0
            cogs += itemCost * (item.quantity || 1)
          })

          const profit = total - cogs
          const margin = total > 0 ? (profit / total) * 100 : 0

          return {
            id: doc.id,
            total,
            cogs,
            profit,
            margin,
            shipping,
            channel: data.channel || data.source || 'direct',
            status: data.status || 'pending',
            fulfillmentStatus: data.fulfillmentStatus || 'unfulfilled',
            createdAt: data.createdAt?.toDate() || new Date(),
            items: items.map((item: any) => ({
              productId: item.productId || '',
              productName: item.productName || item.name || item.title || '',
              sku: item.sku || '',
              quantity: item.quantity || 1,
              price: item.price || 0,
            })),
          }
        })
        setOrders(ordersData)
      } catch (error) {
        console.error('Error loading report data:', error)
        addToast('error', 'Failed to load report data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [organization?.id, addToast])

  // Get date range bounds
  const getDateRange = () => {
    const now = new Date()
    let start: Date
    let end: Date = new Date(now)
    end.setHours(23, 59, 59, 999)

    switch (dateRange) {
      case 'today':
        start = new Date(now)
        start.setHours(0, 0, 0, 0)
        break
      case 'wtd':
        start = new Date(now)
        start.setDate(now.getDate() - now.getDay())
        start.setHours(0, 0, 0, 0)
        break
      case 'mtd':
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'ytd':
        start = new Date(now.getFullYear(), 0, 1)
        break
      case 'custom':
        start = customStart ? new Date(customStart) : new Date(now)
        end = customEnd ? new Date(customEnd) : new Date(now)
        end.setHours(23, 59, 59, 999)
        break
      default:
        start = new Date(now)
    }

    return { start, end }
  }

  // Get orders in date range
  const ordersInRange = useMemo(() => {
    const { start, end } = getDateRange()
    return orders.filter(o => {
      const date = new Date(o.createdAt)
      return date >= start && date <= end && o.status !== 'cancelled'
    })
  }, [orders, dateRange, customStart, customEnd])

  // Inventory stats
  const inventoryStats = useMemo(() => {
    let totalValue = 0
    let lowStockCount = 0
    let outOfStockCount = 0

    products.forEach(product => {
      const stock = product.totalStock || 0
      const cost = product.cost || 0

      totalValue += stock * cost

      if (stock === 0) {
        outOfStockCount++
      } else if (stock <= (product.lowStockThreshold || 10)) {
        lowStockCount++
      }
    })

    return { totalValue, lowStockCount, outOfStockCount }
  }, [products])

  // Profitability stats
  const profitabilityStats = useMemo(() => {
    const totalRevenue = ordersInRange.reduce((sum, o) => sum + o.total, 0)
    const totalCOGS = ordersInRange.reduce((sum, o) => sum + o.cogs, 0)
    const grossProfit = ordersInRange.reduce((sum, o) => sum + o.profit, 0)
    const orderCount = ordersInRange.length
    const avgOrderValue = orderCount > 0 ? totalRevenue / orderCount : 0
    const avgMargin = orderCount > 0 ? ordersInRange.reduce((sum, o) => sum + o.margin, 0) / orderCount : 0
    const shippingRevenue = ordersInRange.reduce((sum, o) => sum + (o.shipping || 0), 0)
    const totalUnits = ordersInRange.reduce((sum, o) => sum + o.items.reduce((itemSum, i) => itemSum + i.quantity, 0), 0)

    return {
      totalRevenue,
      totalCOGS,
      grossProfit,
      orderCount,
      avgOrderValue,
      avgMargin,
      shippingRevenue,
      shippingCost: 0, // Would need shipment data
      shippingProfit: shippingRevenue,
      totalUnits,
    }
  }, [ordersInRange])

  // Channel performance
  const channelStats = useMemo(() => {
    const byChannel: Record<string, { orders: number; revenue: number; cogs: number; profit: number; units: number }> = {}

    ordersInRange.forEach(o => {
      const channel = o.channel || 'direct'
      if (!byChannel[channel]) {
        byChannel[channel] = { orders: 0, revenue: 0, cogs: 0, profit: 0, units: 0 }
      }
      byChannel[channel].orders++
      byChannel[channel].revenue += o.total
      byChannel[channel].cogs += o.cogs
      byChannel[channel].profit += o.profit
      byChannel[channel].units += o.items.reduce((sum, i) => sum + i.quantity, 0)
    })

    return Object.entries(byChannel).map(([channel, data]) => ({
      channel,
      ...data,
      avgOrderValue: data.orders > 0 ? data.revenue / data.orders : 0,
      margin: data.revenue > 0 ? (data.profit / data.revenue) * 100 : 0,
    })).sort((a, b) => b.revenue - a.revenue)
  }, [ordersInRange])

  // Product performance
  const productStats = useMemo(() => {
    const byProduct: Record<string, { productName: string; sku: string; unitsSold: number; revenue: number }> = {}

    ordersInRange.forEach(o => {
      o.items.forEach(item => {
        const key = item.productId || item.sku || item.productName
        if (!byProduct[key]) {
          byProduct[key] = {
            productName: item.productName,
            sku: item.sku || '',
            unitsSold: 0,
            revenue: 0,
          }
        }
        byProduct[key].unitsSold += item.quantity
        byProduct[key].revenue += item.price * item.quantity
      })
    })

    return Object.entries(byProduct)
      .map(([productId, data]) => {
        const product = products.find(p => p.id === productId || p.sku === data.sku)
        const cost = (product?.cost || 0) * data.unitsSold
        return {
          productId,
          ...data,
          cost,
          profit: data.revenue - cost,
          margin: data.revenue > 0 ? ((data.revenue - cost) / data.revenue) * 100 : 0,
        }
      })
      .sort((a, b) => b.revenue - a.revenue)
  }, [ordersInRange, products])

  // Format number
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  // Export CSV
  const handleExportCSV = () => {
    let data: string[][] = []
    let filename = ''

    if (currentReport === 'profitability') {
      data = [
        ['Metric', 'Value'],
        ['Total Revenue', profitabilityStats.totalRevenue.toFixed(2)],
        ['COGS', profitabilityStats.totalCOGS.toFixed(2)],
        ['Gross Profit', profitabilityStats.grossProfit.toFixed(2)],
        ['Order Count', profitabilityStats.orderCount.toString()],
        ['Avg Order Value', profitabilityStats.avgOrderValue.toFixed(2)],
        ['Avg Margin', profitabilityStats.avgMargin.toFixed(1) + '%'],
        ['Shipping Revenue', profitabilityStats.shippingRevenue.toFixed(2)],
      ]
      filename = 'profitability-report'
    } else if (currentReport === 'channel') {
      data = [
        ['Channel', 'Orders', 'Revenue', 'COGS', 'Profit', 'Margin'],
        ...channelStats.map(c => [
          c.channel,
          c.orders.toString(),
          c.revenue.toFixed(2),
          c.cogs.toFixed(2),
          c.profit.toFixed(2),
          c.margin.toFixed(1) + '%',
        ]),
      ]
      filename = 'channel-report'
    } else if (currentReport === 'product') {
      data = [
        ['Product', 'SKU', 'Units Sold', 'Revenue', 'Cost', 'Profit', 'Margin'],
        ...productStats.map(p => [
          p.productName,
          p.sku,
          p.unitsSold.toString(),
          p.revenue.toFixed(2),
          p.cost.toFixed(2),
          p.profit.toFixed(2),
          p.margin.toFixed(1) + '%',
        ]),
      ]
      filename = 'product-report'
    } else {
      data = [
        ['Metric', 'Value'],
        ['Total Products', products.length.toString()],
        ['Inventory Value', inventoryStats.totalValue.toFixed(2)],
        ['Low Stock Items', inventoryStats.lowStockCount.toString()],
        ['Out of Stock Items', inventoryStats.outOfStockCount.toString()],
      ]
      filename = 'inventory-report'
    }

    const csv = data.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}-${dateRange}-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)

    addToast('success', 'Report exported successfully')
  }

  // Export PDF placeholder
  const handleExportPDF = () => {
    addToast('info', 'PDF export coming soon!')
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'shopify':
        return <i className="fab fa-shopify text-green-400"></i>
      case 'amazon_fba':
      case 'amazon_fbm':
        return <i className="fab fa-amazon text-orange-400"></i>
      default:
        return <Store className="w-4 h-4 text-slate-400" />
    }
  }

  const getChannelName = (channel: string) => {
    switch (channel) {
      case 'shopify':
        return 'Shopify'
      case 'amazon_fba':
        return 'Amazon FBA'
      case 'amazon_fbm':
        return 'Amazon FBM'
      default:
        return channel.charAt(0).toUpperCase() + channel.slice(1)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-purple-400" />
            Reports
          </h1>
          <p className="text-sm text-slate-400">Analyze business performance and profitability</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Picker */}
          <div className="flex items-center bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-1">
            {(['today', 'wtd', 'mtd', 'ytd', 'custom'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  dateRange === range
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range === 'custom' ? (
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Custom
                  </span>
                ) : (
                  range.toUpperCase()
                )}
              </button>
            ))}
          </div>
          {/* Export Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
            >
              <FileText className="w-4 h-4" />
              PDF
            </button>
          </div>
        </div>
      </div>

      {/* Custom Date Range Inputs */}
      {dateRange === 'custom' && (
        <div className="flex items-center gap-4 p-4 bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">From:</label>
            <input
              type="date"
              value={customStart}
              onChange={(e) => setCustomStart(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-400">To:</label>
            <input
              type="date"
              value={customEnd}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>
      )}

      {/* Report Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700/50 pb-4">
        {[
          { id: 'profitability', label: 'Profitability', icon: TrendingUp },
          { id: 'channel', label: 'Channel', icon: Store },
          { id: 'product', label: 'Product', icon: Package },
          { id: 'shipping', label: 'Inventory', icon: Truck },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentReport(tab.id as ReportType)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              currentReport === tab.id
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profitability Report */}
      {currentReport === 'profitability' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <DollarSign className="w-4 h-4" />
                Total Revenue
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.totalRevenue, baseCurrency)}</div>
              <div className="text-sm text-slate-400 mt-1">{profitabilityStats.orderCount} orders</div>
            </div>
            {canViewCosts && (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Package className="w-4 h-4" />
                  COGS
                </div>
                <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.totalCOGS, baseCurrency)}</div>
                <div className="text-sm text-slate-400 mt-1">{formatNumber(profitabilityStats.totalUnits)} units sold</div>
              </div>
            )}
            {canViewCosts && (
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border border-emerald-500/30 rounded-xl p-5">
                <div className="flex items-center gap-2 text-emerald-400 text-sm mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Gross Profit
                </div>
                <div className="text-3xl font-bold text-emerald-400">{formatCurrency(profitabilityStats.grossProfit, baseCurrency)}</div>
                <div className="text-sm text-emerald-300 mt-1">{profitabilityStats.avgMargin.toFixed(1)}% margin</div>
              </div>
            )}
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <ShoppingCart className="w-4 h-4" />
                Avg Order Value
              </div>
              <div className="text-3xl font-bold text-white">{formatCurrency(profitabilityStats.avgOrderValue, baseCurrency)}</div>
              <div className="text-sm text-slate-400 mt-1">Per order average</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Truck className="w-4 h-4" />
                Shipping Revenue
              </div>
              <div className="text-3xl font-bold text-emerald-400">
                {formatCurrency(profitabilityStats.shippingRevenue, baseCurrency)}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                Customer paid
              </div>
            </div>
          </div>

          {/* Profit Breakdown */}
          {canViewCosts && (
            <div className="grid grid-cols-2 gap-6">
              {/* Revenue Breakdown */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Product Revenue</span>
                    <span className="text-white font-medium">{formatCurrency(profitabilityStats.totalRevenue - profitabilityStats.shippingRevenue, baseCurrency)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Shipping Revenue</span>
                    <span className="text-white font-medium">{formatCurrency(profitabilityStats.shippingRevenue, baseCurrency)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                    <span className="text-white font-medium">Total Revenue</span>
                    <span className="text-white font-bold text-lg">{formatCurrency(profitabilityStats.totalRevenue, baseCurrency)}</span>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Cost of Goods Sold</span>
                    <span className="text-white font-medium">{formatCurrency(profitabilityStats.totalCOGS, baseCurrency)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Shipping Cost</span>
                    <span className="text-white font-medium">{formatCurrency(profitabilityStats.shippingCost, baseCurrency)}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-4 flex items-center justify-between">
                    <span className="text-white font-medium">Total Costs</span>
                    <span className="text-white font-bold text-lg">{formatCurrency(profitabilityStats.totalCOGS + profitabilityStats.shippingCost, baseCurrency)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profit Summary */}
          {canViewCosts && (
            <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-1">Net Profit (Products + Shipping)</div>
                  <div className="text-4xl font-bold text-emerald-400">
                    {formatCurrency(profitabilityStats.grossProfit + profitabilityStats.shippingProfit, baseCurrency)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-sm mb-1">Overall Margin</div>
                  <div className="text-3xl font-bold text-white">
                    {profitabilityStats.totalRevenue > 0
                      ? (((profitabilityStats.grossProfit + profitabilityStats.shippingProfit) / profitabilityStats.totalRevenue) * 100).toFixed(1)
                      : 0}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Channel Report */}
      {currentReport === 'channel' && (
        <div className="space-y-6">
          {/* Channel Cards */}
          <div className="grid grid-cols-3 gap-4">
            {channelStats.slice(0, 3).map((channel) => (
              <Link
                key={channel.channel}
                href={`/orders?channel=${channel.channel}`}
                className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5 hover:bg-slate-700/50 hover:border-slate-600 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                    {getChannelIcon(channel.channel)}
                  </div>
                  <div>
                    <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">{getChannelName(channel.channel)}</div>
                    <div className="text-xs text-slate-400">{channel.orders} orders</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-white">{formatCurrency(channel.revenue, baseCurrency)}</div>
                    <div className="text-xs text-slate-400">Revenue</div>
                  </div>
                  {canViewCosts && (
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{formatCurrency(channel.profit, baseCurrency)}</div>
                      <div className="text-xs text-slate-400">Profit</div>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="text-sm text-slate-400">Avg Order</div>
                  <div className="text-white font-medium">{formatCurrency(channel.avgOrderValue, baseCurrency)}</div>
                </div>
                {canViewCosts && (
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-sm text-slate-400">Margin</div>
                    <div className={`font-medium ${channel.margin >= 30 ? 'text-emerald-400' : channel.margin >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                      {channel.margin.toFixed(1)}%
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Channel Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50">
              <h3 className="font-semibold text-white">Channel Performance Comparison</h3>
            </div>
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700/50">
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium">Channel</th>
                  <th className="px-5 py-3 font-medium text-right">Orders</th>
                  <th className="px-5 py-3 font-medium text-right">Units</th>
                  <th className="px-5 py-3 font-medium text-right">Revenue</th>
                  {canViewCosts && <th className="px-5 py-3 font-medium text-right">COGS</th>}
                  {canViewCosts && <th className="px-5 py-3 font-medium text-right">Profit</th>}
                  {canViewCosts && <th className="px-5 py-3 font-medium text-right">Margin</th>}
                  <th className="px-5 py-3 font-medium text-right">AOV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {channelStats.map((channel) => (
                  <tr key={channel.channel} className="hover:bg-slate-700/30 transition-colors group">
                    <td className="px-5 py-4">
                      <Link href={`/orders?channel=${channel.channel}`} className="flex items-center gap-3 hover:text-emerald-300 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-slate-600/50 transition-colors">
                          {getChannelIcon(channel.channel)}
                        </div>
                        <span className="text-white font-medium group-hover:text-emerald-300 transition-colors">{getChannelName(channel.channel)}</span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 text-right text-white">{channel.orders}</td>
                    <td className="px-5 py-4 text-right text-slate-300">{channel.units}</td>
                    <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(channel.revenue, baseCurrency)}</td>
                    {canViewCosts && <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(channel.cogs, baseCurrency)}</td>}
                    {canViewCosts && <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(channel.profit, baseCurrency)}</td>}
                    {canViewCosts && (
                      <td className="px-5 py-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          channel.margin >= 30 ? 'bg-emerald-500/20 text-emerald-400' :
                          channel.margin >= 15 ? 'bg-amber-500/20 text-amber-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {channel.margin.toFixed(1)}%
                        </span>
                      </td>
                    )}
                    <td className="px-5 py-4 text-right text-white">{formatCurrency(channel.avgOrderValue, baseCurrency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {channelStats.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                <Store className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No channel data in selected period</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Report */}
      {currentReport === 'product' && (
        <div className="space-y-6">
          {/* Top Products */}
          <div className="grid grid-cols-4 gap-4">
            {productStats.slice(0, 4).map((product, idx) => (
              <Link
                key={product.productId}
                href={`/inventory?search=${encodeURIComponent(product.sku || product.productName)}`}
                className={`bg-slate-800/50 backdrop-blur border rounded-xl p-5 hover:bg-slate-700/50 transition-all group ${
                  idx === 0 ? 'border-amber-500/30 hover:border-amber-500/50' : 'border-slate-700/50 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {idx === 0 && <span className="text-amber-400 text-xs">TOP SELLER</span>}
                  {idx > 0 && <span className="text-slate-500 text-xs">#{idx + 1}</span>}
                </div>
                <div className="text-white font-medium mb-1 truncate group-hover:text-emerald-300 transition-colors">{product.productName}</div>
                <div className="text-xs text-slate-400 mb-3">{product.sku}</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xl font-bold text-white">{product.unitsSold}</div>
                    <div className="text-xs text-slate-500">Units</div>
                  </div>
                  {canViewCosts && (
                    <div>
                      <div className="text-xl font-bold text-emerald-400">{formatCurrency(product.profit, baseCurrency)}</div>
                      <div className="text-xs text-slate-500">Profit</div>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Product Table */}
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/50 flex items-center justify-between">
              <h3 className="font-semibold text-white">Product Performance</h3>
              <span className="text-sm text-slate-400">{productStats.length} products sold</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700/50 sticky top-0">
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3 font-medium">Product</th>
                    <th className="px-5 py-3 font-medium text-right">Units Sold</th>
                    <th className="px-5 py-3 font-medium text-right">Revenue</th>
                    {canViewCosts && <th className="px-5 py-3 font-medium text-right">Cost</th>}
                    {canViewCosts && <th className="px-5 py-3 font-medium text-right">Profit</th>}
                    {canViewCosts && <th className="px-5 py-3 font-medium text-right">Margin</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {productStats.map((product) => (
                    <tr key={product.productId} className="hover:bg-slate-700/30 transition-colors group">
                      <td className="px-5 py-4">
                        <Link href={`/inventory?search=${encodeURIComponent(product.sku || product.productName)}`} className="block hover:text-emerald-300 transition-colors">
                          <div className="text-white font-medium group-hover:text-emerald-300 transition-colors">{product.productName}</div>
                          <div className="text-xs text-slate-400">{product.sku}</div>
                        </Link>
                      </td>
                      <td className="px-5 py-4 text-right text-white">{product.unitsSold}</td>
                      <td className="px-5 py-4 text-right text-white font-medium">{formatCurrency(product.revenue, baseCurrency)}</td>
                      {canViewCosts && <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(product.cost, baseCurrency)}</td>}
                      {canViewCosts && <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(product.profit, baseCurrency)}</td>}
                      {canViewCosts && (
                        <td className="px-5 py-4 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.margin >= 40 ? 'bg-emerald-500/20 text-emerald-400' :
                            product.margin >= 25 ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {product.margin.toFixed(1)}%
                          </span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {productStats.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No product sales in selected period</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Report (replacing Shipping) */}
      {currentReport === 'shipping' && (
        <div className="space-y-6">
          {/* Inventory Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                <Package className="w-4 h-4" />
                Total Products
              </div>
              <div className="text-3xl font-bold text-white">{products.length}</div>
              <div className="text-sm text-slate-400 mt-1">In catalog</div>
            </div>
            {canViewCosts && (
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <DollarSign className="w-4 h-4" />
                  Inventory Value
                </div>
                <div className="text-3xl font-bold text-emerald-400">{formatCurrency(inventoryStats.totalValue, baseCurrency)}</div>
                <div className="text-sm text-slate-400 mt-1">Total stock value</div>
              </div>
            )}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 text-amber-400 text-sm mb-2">
                <Percent className="w-4 h-4" />
                Low Stock
              </div>
              <div className="text-3xl font-bold text-amber-400">{inventoryStats.lowStockCount}</div>
              <div className="text-sm text-slate-400 mt-1">Below threshold</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                <Package className="w-4 h-4" />
                Out of Stock
              </div>
              <div className="text-3xl font-bold text-red-400">{inventoryStats.outOfStockCount}</div>
              <div className="text-sm text-slate-400 mt-1">Zero inventory</div>
            </div>
          </div>

          {/* Top Products by Stock Value */}
          {canViewCosts && (
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50">
                <h3 className="font-semibold text-white">Top Products by Inventory Value</h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700/50 sticky top-0">
                    <tr className="text-left text-xs text-slate-400 uppercase tracking-wider">
                      <th className="px-5 py-3 font-medium">Product</th>
                      <th className="px-5 py-3 font-medium text-right">Stock</th>
                      <th className="px-5 py-3 font-medium text-right">Unit Cost</th>
                      <th className="px-5 py-3 font-medium text-right">Total Value</th>
                      <th className="px-5 py-3 font-medium text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {products
                      .map(p => ({
                        ...p,
                        value: (p.totalStock || 0) * (p.cost || 0)
                      }))
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 20)
                      .map((product) => (
                        <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-5 py-4">
                            <Link href={`/inventory/${product.id}`} className="block hover:text-emerald-300 transition-colors">
                              <div className="text-white font-medium">{product.name}</div>
                              <div className="text-xs text-slate-400">{product.sku}</div>
                            </Link>
                          </td>
                          <td className="px-5 py-4 text-right text-white">{product.totalStock}</td>
                          <td className="px-5 py-4 text-right text-slate-300">{formatCurrency(product.cost, baseCurrency)}</td>
                          <td className="px-5 py-4 text-right text-emerald-400 font-medium">{formatCurrency(product.value, baseCurrency)}</td>
                          <td className="px-5 py-4 text-right">
                            {product.totalStock === 0 ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400">
                                Out of Stock
                              </span>
                            ) : product.totalStock <= product.lowStockThreshold ? (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                                Low Stock
                              </span>
                            ) : (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400">
                                In Stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {orders.length === 0 && products.length === 0 && (
        <div className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-12 text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-purple-400/30" />
          <h3 className="text-xl font-semibold text-white mb-2">No Data Available</h3>
          <p className="text-slate-400">Import products and sync orders to see your reports.</p>
        </div>
      )}
    </div>
  )
}
