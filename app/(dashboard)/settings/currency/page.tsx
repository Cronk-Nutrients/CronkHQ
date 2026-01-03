'use client'

import { useState, useEffect } from 'react'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useOrganization } from '@/context/OrganizationContext'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { useCurrency } from '@/hooks/useCurrency'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'MXN', name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
]

export default function CurrencySettingsPage() {
  const { organization } = useOrganization()
  const { addToast } = useToast()
  const {
    baseCurrency,
    exchangeRates,
    lastFetchedAt,
    refreshRates,
    refreshing,
    getRate,
    loading: currencyLoading
  } = useCurrency()

  const [saving, setSaving] = useState(false)
  const [selectedBase, setSelectedBase] = useState(baseCurrency)

  // Update selected base when currency data loads
  useEffect(() => {
    setSelectedBase(baseCurrency)
  }, [baseCurrency])

  // Save base currency
  const handleSaveBaseCurrency = async () => {
    if (!organization?.id) return

    setSaving(true)
    try {
      const orgRef = doc(db, 'organizations', organization.id)
      await updateDoc(orgRef, {
        'currency.baseCurrency': selectedBase,
      })

      // Refresh rates with new base
      await refreshRates()
      addToast('success', 'Currency settings saved')
    } catch (err) {
      console.error('Error saving currency:', err)
      addToast('error', 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  // Get time since last update
  const getTimeSinceUpdate = () => {
    if (!lastFetchedAt) return 'Never'
    const diff = Date.now() - lastFetchedAt.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0) return `${hours}h ${minutes}m ago`
    return `${minutes}m ago`
  }

  if (currencyLoading) {
    return (
      <div className="p-6 max-w-4xl flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Currency Settings</h1>
        <p className="text-slate-400">Configure your base currency and exchange rates</p>
      </div>

      {/* Base Currency */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
        <h3 className="text-white font-semibold mb-4">Base Currency</h3>
        <p className="text-sm text-slate-400 mb-4">
          Your organization&apos;s default currency for reporting and calculations.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {CURRENCIES.map(currency => (
            <button
              key={currency.code}
              onClick={() => setSelectedBase(currency.code)}
              className={`p-4 rounded-lg border text-left transition-all ${
                selectedBase === currency.code
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{currency.flag}</span>
                <span className="text-white font-medium">{currency.code}</span>
              </div>
              <div className="text-sm text-slate-400">{currency.name}</div>
            </button>
          ))}
        </div>

        {selectedBase !== baseCurrency && (
          <Button onClick={handleSaveBaseCurrency} disabled={saving}>
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save mr-2"></i>
                Save Changes
              </>
            )}
          </Button>
        )}
      </div>

      {/* Exchange Rates */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold">Exchange Rates</h3>
            <p className="text-sm text-slate-400">
              Last updated: {getTimeSinceUpdate()}
            </p>
          </div>
          <Button variant="secondary" onClick={() => refreshRates()} disabled={refreshing}>
            {refreshing ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Refreshing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt mr-2"></i>
                Refresh Rates
              </>
            )}
          </Button>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2 text-sm">
            <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
            <span className="text-slate-300">
              Rates refresh automatically every 24 hours and when creating purchase orders in foreign currencies.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {CURRENCIES.filter(c => c.code !== baseCurrency).map(currency => {
            const rate = getRate(baseCurrency, currency.code)
            const reverseRate = getRate(currency.code, baseCurrency)

            return (
              <div
                key={currency.code}
                className="bg-slate-900/50 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{currency.flag}</span>
                  <span className="text-white font-medium">{currency.code}</span>
                  <span className="text-slate-500">-</span>
                  <span className="text-slate-400">{currency.name}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">1 {baseCurrency} =</span>
                    <span className="text-emerald-400 font-mono">
                      {rate ? rate.toFixed(4) : '---'} {currency.code}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">1 {currency.code} =</span>
                    <span className="text-emerald-400 font-mono">
                      {reverseRate ? reverseRate.toFixed(4) : '---'} {baseCurrency}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {Object.keys(exchangeRates).length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-exchange-alt text-4xl text-slate-600 mb-3"></i>
            <p className="text-slate-400">No exchange rates loaded</p>
            <Button variant="secondary" onClick={() => refreshRates()} className="mt-4">
              Load Exchange Rates
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
