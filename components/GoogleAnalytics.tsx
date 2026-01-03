'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { useOrganization } from '@/context/OrganizationContext'

export function GoogleAnalytics() {
  const { organization } = useOrganization()
  const [measurementId, setMeasurementId] = useState<string | null>(null)
  const [conversionId, setConversionId] = useState<string | null>(null)

  useEffect(() => {
    if (!organization?.id) return

    // Listen for changes to GA/Ads connections
    const unsubscribe = onSnapshot(
      doc(db, 'organizations', organization.id),
      (doc) => {
        if (doc.exists()) {
          const data = doc.data()

          // Google Analytics
          const ga = data.googleAnalytics
          if (ga?.isConnected && ga?.measurementId) {
            setMeasurementId(ga.measurementId)
          } else {
            setMeasurementId(null)
          }

          // Google Ads
          const ads = data.googleAds
          if (ads?.isConnected && ads?.conversionId) {
            setConversionId(ads.conversionId)
          } else {
            setConversionId(null)
          }
        }
      }
    )

    return () => unsubscribe()
  }, [organization?.id])

  // Don't render anything if no tracking is configured
  if (!measurementId && !conversionId) {
    return null
  }

  return (
    <>
      {/* Google Analytics / Tag Manager */}
      {measurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                page_path: window.location.pathname,
              });
              ${conversionId ? `gtag('config', '${conversionId}');` : ''}
            `}
          </Script>
        </>
      )}

      {/* Google Ads only (if no GA) */}
      {!measurementId && conversionId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${conversionId}`}
            strategy="afterInteractive"
          />
          <Script id="google-ads" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${conversionId}');
            `}
          </Script>
        </>
      )}
    </>
  )
}
