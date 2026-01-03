import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { propertyId, accessToken } = await request.json()

    if (!propertyId || !accessToken) {
      return NextResponse.json({ success: false, error: 'Missing required fields' })
    }

    // Get data streams for the property
    const streamsResponse = await fetch(
      `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}/dataStreams`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )

    const streamsData = await streamsResponse.json()

    if (streamsData.error) {
      console.error('Streams error:', streamsData)
      return NextResponse.json({
        success: false,
        error: streamsData.error.message || 'Failed to fetch data streams',
      })
    }

    // Find web stream with measurement ID
    let measurementId = null
    for (const stream of streamsData.dataStreams || []) {
      if (stream.webStreamData?.measurementId) {
        measurementId = stream.webStreamData.measurementId
        break
      }
    }

    return NextResponse.json({
      success: true,
      measurementId,
    })
  } catch (error: any) {
    console.error('Get measurement ID error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to get measurement ID',
    })
  }
}
