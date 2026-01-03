import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

interface CampaignData {
  name: string
  cost: number
  impressions: number
  clicks: number
  conversions: number
  conversionValue: number
  ctr: number
  avgCpc: number
}

// Parse currency string to number
function parseCurrency(value: any): number {
  if (typeof value === 'number') return value
  if (!value) return 0
  const str = String(value).replace(/[^0-9.-]/g, '')
  return parseFloat(str) || 0
}

// Parse percentage string to number
function parsePercentage(value: any): number {
  if (typeof value === 'number') return value
  if (!value) return 0
  const str = String(value).replace(/[^0-9.-]/g, '')
  return parseFloat(str) || 0
}

export async function POST(request: NextRequest) {
  try {
    const { organizationId, sheetId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    // Get sheet ID from org if not provided
    let finalSheetId = sheetId
    if (!finalSheetId) {
      const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
      if (!orgDoc.exists) {
        return NextResponse.json({ success: false, error: 'Organization not found' })
      }
      finalSheetId = orgDoc.data()?.googleAdsSheets?.sheetId
    }

    if (!finalSheetId) {
      return NextResponse.json({ success: false, error: 'No Google Sheet connected' })
    }

    // Fetch sheet data
    const sheetsUrl = `https://docs.google.com/spreadsheets/d/${finalSheetId}/gviz/tq?tqx=out:json`
    const response = await fetch(sheetsUrl)

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Cannot access sheet' })
    }

    const text = await response.text()
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/)

    if (!jsonMatch) {
      return NextResponse.json({ success: false, error: 'Invalid sheet format' })
    }

    const data = JSON.parse(jsonMatch[1])
    const rows = data.table?.rows || []
    const cols = data.table?.cols || []

    // Map column indices
    const colMap: Record<string, number> = {}
    cols.forEach((col: any, index: number) => {
      const label = (col.label || '').toLowerCase()
      if (label.includes('campaign') && !label.includes('id')) colMap.campaign = index
      else if (label.includes('cost') && !label.includes('conv')) colMap.cost = index
      else if (label.includes('impression')) colMap.impressions = index
      else if (label.includes('click') && !label.includes('rate')) colMap.clicks = index
      else if (label.includes('conversion') && label.includes('value')) colMap.conversionValue = index
      else if (label.includes('conversion')) colMap.conversions = index
      else if (label.includes('ctr') || (label.includes('click') && label.includes('rate'))) colMap.ctr = index
      else if (label.includes('cpc') || (label.includes('avg') && label.includes('cost'))) colMap.avgCpc = index
    })

    // Parse campaigns
    const campaigns: CampaignData[] = []
    let totalSpend = 0
    let totalImpressions = 0
    let totalClicks = 0
    let totalConversions = 0
    let totalConversionValue = 0

    for (const row of rows) {
      const cells = row.c || []
      const campaignName = cells[colMap.campaign]?.v

      if (!campaignName || typeof campaignName !== 'string') continue

      const campaign: CampaignData = {
        name: campaignName,
        cost: parseCurrency(cells[colMap.cost]?.v),
        impressions: parseInt(cells[colMap.impressions]?.v) || 0,
        clicks: parseInt(cells[colMap.clicks]?.v) || 0,
        conversions: parseFloat(cells[colMap.conversions]?.v) || 0,
        conversionValue: parseCurrency(cells[colMap.conversionValue]?.v),
        ctr: parsePercentage(cells[colMap.ctr]?.v),
        avgCpc: parseCurrency(cells[colMap.avgCpc]?.v),
      }

      campaigns.push(campaign)
      totalSpend += campaign.cost
      totalImpressions += campaign.impressions
      totalClicks += campaign.clicks
      totalConversions += campaign.conversions
      totalConversionValue += campaign.conversionValue
    }

    // Calculate totals
    const overallCtr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0
    const overallCpc = totalClicks > 0 ? totalSpend / totalClicks : 0
    const roas = totalSpend > 0 ? totalConversionValue / totalSpend : 0

    // Save to Firestore
    const batch = adminDb().batch()

    // Save individual campaigns
    for (const campaign of campaigns) {
      const campaignId = campaign.name.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 100)
      const campaignRef = adminDb()
        .collection('organizations')
        .doc(organizationId)
        .collection('googleAdsCampaigns')
        .doc(campaignId)

      batch.set(campaignRef, {
        ...campaign,
        syncedAt: new Date(),
      })
    }

    // Update org summary
    await adminDb().collection('organizations').doc(organizationId).update({
      'googleAdsSheets.lastSync': new Date(),
      'googleAdsSheets.campaignCount': campaigns.length,
      'googleAdsSheets.summary': {
        totalSpend,
        totalImpressions,
        totalClicks,
        totalConversions,
        totalConversionValue,
        ctr: overallCtr,
        avgCpc: overallCpc,
        roas,
      },
    })

    await batch.commit()

    return NextResponse.json({
      success: true,
      campaignCount: campaigns.length,
      summary: {
        totalSpend,
        totalImpressions,
        totalClicks,
        totalConversions,
        roas,
      },
    })
  } catch (error: any) {
    console.error('Sync error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Sync failed',
    })
  }
}
