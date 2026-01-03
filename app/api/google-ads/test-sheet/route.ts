import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { sheetId } = await request.json()

    if (!sheetId) {
      return NextResponse.json({
        success: false,
        error: 'Missing sheet ID',
      })
    }

    // Use Google Sheets API to read the sheet (public access)
    // The sheet needs to be shared as "Anyone with the link can view"
    const sheetsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`

    const response = await fetch(sheetsUrl)

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: 'Cannot access sheet. Make sure it\'s shared as "Anyone with the link can view".',
      })
    }

    const text = await response.text()

    // Google returns JSONP-like format, extract the JSON
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);?$/)
    if (!jsonMatch) {
      return NextResponse.json({
        success: false,
        error: 'Invalid sheet format. Make sure you\'re using the Google Ads add-on report.',
      })
    }

    const data = JSON.parse(jsonMatch[1])

    // Extract campaign data
    const rows = data.table?.rows || []
    const cols = data.table?.cols || []

    // Find the Campaign column
    const campaignColIndex = cols.findIndex((col: any) =>
      col.label?.toLowerCase().includes('campaign') &&
      !col.label?.toLowerCase().includes('id')
    )

    if (campaignColIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'No "Campaign" column found. Make sure your report includes campaign names.',
      })
    }

    // Get campaign names (skip header row if present)
    const campaigns = rows
      .map((row: any) => row.c?.[campaignColIndex]?.v)
      .filter((name: any) => name && typeof name === 'string' && name.trim())

    if (campaigns.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No campaign data found. Make sure your Google Ads report has data.',
      })
    }

    return NextResponse.json({
      success: true,
      campaignCount: campaigns.length,
      sampleCampaigns: campaigns.slice(0, 5),
      columns: cols.map((c: any) => c.label).filter(Boolean),
    })
  } catch (error: any) {
    console.error('Test sheet error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to read sheet',
    })
  }
}
