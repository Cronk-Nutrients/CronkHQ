import { NextRequest, NextResponse } from 'next/server'
import { adminDb } from '@/lib/firebase-admin'

const KLAVIYO_API_VERSION = '2024-02-15'

async function fetchKlaviyoEndpoint(url: string, headers: HeadersInit): Promise<any> {
  try {
    const response = await fetch(url, { headers })
    if (response.ok) {
      return await response.json()
    }
    console.error(`Klaviyo API error for ${url}:`, response.status)
    return { data: [] }
  } catch (error) {
    console.error(`Klaviyo fetch error for ${url}:`, error)
    return { data: [] }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json({ success: false, error: 'Missing organization ID' })
    }

    // Get API key from Firestore
    const orgDoc = await adminDb().collection('organizations').doc(organizationId).get()
    if (!orgDoc.exists) {
      return NextResponse.json({ success: false, error: 'Organization not found' })
    }

    const orgData = orgDoc.data()
    const apiKey = orgData?.klaviyo?.apiKey

    if (!apiKey || !orgData?.klaviyo?.isConnected) {
      return NextResponse.json({ success: false, error: 'Klaviyo not connected' })
    }

    const headers = {
      'Authorization': `Klaviyo-API-Key ${apiKey}`,
      'revision': KLAVIYO_API_VERSION,
      'Accept': 'application/json',
    }

    // Fetch all data in parallel
    const [
      accountData,
      listsData,
      campaignsData,
      flowsData,
      segmentsData,
      profilesData,
      metricsData,
      tagsData,
    ] = await Promise.all([
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/accounts/', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/lists/?page[size]=100', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/campaigns/?filter=equals(messages.channel,"email")&sort=-updated_at&page[size]=50', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/flows/?page[size]=100', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/segments/?page[size]=100', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/profiles/?page[size]=1', headers), // Just to get count
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/metrics/', headers),
      fetchKlaviyoEndpoint('https://a.klaviyo.com/api/tags/?page[size]=50', headers),
    ])

    // Get total profile count from profiles endpoint
    let totalProfiles = 0
    if (profilesData.links?.self) {
      // Try to get total count from the profiles endpoint with a filter
      try {
        // Klaviyo doesn't provide a direct count, so we'll estimate from lists
        const totalFromLists = listsData.data?.reduce((sum: number, list: any) => {
          return sum + (list.attributes?.profile_count || 0)
        }, 0) || 0
        totalProfiles = totalFromLists
      } catch (e) {
        totalProfiles = 0
      }
    }

    // Get unique subscribers count from the largest list or total
    let totalSubscribers = 0
    if (listsData.data?.length > 0) {
      // Find the largest list (usually the main newsletter)
      const largestList = listsData.data.reduce((max: any, list: any) => {
        const count = list.attributes?.profile_count || 0
        return count > (max?.attributes?.profile_count || 0) ? list : max
      }, listsData.data[0])
      totalSubscribers = largestList?.attributes?.profile_count || 0
    }

    // Fetch campaign messages and statistics for sent campaigns
    const sentCampaigns = campaignsData.data?.filter(
      (c: any) => c.attributes?.status?.toLowerCase() === 'sent'
    ) || []

    // Fetch campaign messages with statistics for the first 10 sent campaigns
    const campaignStatsPromises = sentCampaigns.slice(0, 10).map(async (campaign: any) => {
      try {
        // Get campaign messages
        const messagesUrl = `https://a.klaviyo.com/api/campaign-messages/?filter=equals(campaign.id,"${campaign.id}")`
        const messagesData = await fetchKlaviyoEndpoint(messagesUrl, headers)

        const message = messagesData.data?.[0]
        if (!message) return null

        // Get message statistics
        const statsUrl = `https://a.klaviyo.com/api/campaign-values-reports/`
        const statsResponse = await fetch(statsUrl, {
          method: 'POST',
          headers: {
            ...headers,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              type: 'campaign-values-report',
              attributes: {
                statistics: [
                  'opens',
                  'unique_opens',
                  'clicks',
                  'unique_clicks',
                  'recipients',
                  'delivered',
                  'bounced',
                  'unsubscribes',
                  'spam_complaints',
                  'open_rate',
                  'click_rate',
                  'bounce_rate',
                  'unsubscribe_rate',
                ],
                timeframe: {
                  key: 'all_time',
                },
                conversion_metric_id: null,
                filter: `equals(campaign_id,"${campaign.id}")`,
              },
            },
          }),
        })

        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          const stats = statsData.data?.attributes?.results?.[0]?.statistics || {}
          return {
            campaignId: campaign.id,
            ...stats,
          }
        }
        return null
      } catch (e) {
        return null
      }
    })

    const campaignStats = (await Promise.all(campaignStatsPromises)).filter(Boolean)

    // Build campaign stats map
    const campaignStatsMap = new Map<string, any>()
    campaignStats.forEach((stat: any) => {
      if (stat?.campaignId) {
        campaignStatsMap.set(stat.campaignId, stat)
      }
    })

    // Build campaigns list with available data and statistics
    const campaigns = campaignsData.data?.slice(0, 20).map((campaign: any) => {
      const stats = campaignStatsMap.get(campaign.id) || {}
      return {
        id: campaign.id,
        name: campaign.attributes?.name || 'Untitled Campaign',
        status: campaign.attributes?.status,
        channel: campaign.attributes?.channel || 'email',
        createdAt: campaign.attributes?.created_at,
        updatedAt: campaign.attributes?.updated_at,
        sentAt: campaign.attributes?.send_time,
        subject: campaign.attributes?.message?.subject,
        // Statistics
        recipients: stats.recipients || 0,
        delivered: stats.delivered || 0,
        opens: stats.opens || 0,
        uniqueOpens: stats.unique_opens || 0,
        clicks: stats.clicks || 0,
        uniqueClicks: stats.unique_clicks || 0,
        bounced: stats.bounced || 0,
        unsubscribes: stats.unsubscribes || 0,
        spamComplaints: stats.spam_complaints || 0,
        openRate: stats.open_rate || 0,
        clickRate: stats.click_rate || 0,
        bounceRate: stats.bounce_rate || 0,
        unsubscribeRate: stats.unsubscribe_rate || 0,
      }
    }) || []

    // Calculate aggregate statistics from campaigns
    const sentCampaignsWithStats = campaigns.filter((c: any) => c.status?.toLowerCase() === 'sent' && c.recipients > 0)
    const aggregateStats = {
      totalSent: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.recipients || 0), 0),
      totalDelivered: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.delivered || 0), 0),
      totalOpened: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.uniqueOpens || 0), 0),
      totalClicked: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.uniqueClicks || 0), 0),
      totalBounced: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.bounced || 0), 0),
      totalUnsubscribed: sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.unsubscribes || 0), 0),
      avgOpenRate: sentCampaignsWithStats.length > 0
        ? sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.openRate || 0), 0) / sentCampaignsWithStats.length
        : 0,
      avgClickRate: sentCampaignsWithStats.length > 0
        ? sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.clickRate || 0), 0) / sentCampaignsWithStats.length
        : 0,
      avgBounceRate: sentCampaignsWithStats.length > 0
        ? sentCampaignsWithStats.reduce((sum: number, c: any) => sum + (c.bounceRate || 0), 0) / sentCampaignsWithStats.length
        : 0,
    }

    // Build flows list with action counts
    const flows = await Promise.all(
      (flowsData.data || []).map(async (flow: any) => {
        // Get flow actions count
        let actionCount = 0
        let messageCount = 0
        try {
          const actionsUrl = `https://a.klaviyo.com/api/flow-actions/?filter=equals(flow.id,"${flow.id}")`
          const actionsData = await fetchKlaviyoEndpoint(actionsUrl, headers)
          actionCount = actionsData.data?.length || 0
          messageCount = actionsData.data?.filter((a: any) =>
            a.attributes?.action_type === 'SEND_EMAIL' || a.attributes?.action_type === 'SEND_SMS'
          )?.length || 0
        } catch (e) {
          // Ignore error
        }

        return {
          id: flow.id,
          name: flow.attributes?.name || 'Untitled Flow',
          status: flow.attributes?.status,
          archived: flow.attributes?.archived || false,
          triggerType: flow.attributes?.trigger_type,
          createdAt: flow.attributes?.created,
          updatedAt: flow.attributes?.updated,
          actionCount,
          messageCount,
        }
      })
    )

    // Calculate active flows
    const activeFlows = flows.filter((f: any) => f.status === 'live' || f.status === 'manual').length
    const draftFlows = flows.filter((f: any) => f.status === 'draft').length

    // Build segments list
    const segments = (segmentsData.data || []).map((segment: any) => ({
      id: segment.id,
      name: segment.attributes?.name || 'Untitled Segment',
      profileCount: segment.attributes?.profile_count || 0,
      createdAt: segment.attributes?.created,
      updatedAt: segment.attributes?.updated,
      isActive: segment.attributes?.is_active,
      isStarred: segment.attributes?.is_starred,
    }))

    // Build lists
    const lists = (listsData.data || []).map((list: any) => ({
      id: list.id,
      name: list.attributes?.name || 'Untitled List',
      profileCount: list.attributes?.profile_count || 0,
      createdAt: list.attributes?.created,
      updatedAt: list.attributes?.updated,
      optInProcess: list.attributes?.opt_in_process,
    }))

    // Get account info
    const account = accountData.data?.[0]

    // Calculate total profiles from all unique lists
    const totalListProfiles = lists.reduce((sum: number, list: any) => sum + (list.profileCount || 0), 0)

    return NextResponse.json({
      success: true,
      data: {
        account: {
          id: account?.id,
          name: account?.attributes?.contact_information?.organization_name ||
                orgData?.klaviyo?.accountName || 'Klaviyo Account',
          email: account?.attributes?.contact_information?.default_sender_email ||
                 orgData?.klaviyo?.email,
          timezone: account?.attributes?.timezone,
          publicApiKey: account?.attributes?.public_api_key,
        },
        metrics: {
          // Subscriber metrics
          totalSubscribers: Math.max(totalSubscribers, totalListProfiles),
          totalProfiles: totalProfiles || totalListProfiles,
          // List metrics
          totalLists: lists.length,
          // Campaign metrics
          totalCampaigns: campaignsData.data?.length || 0,
          sentCampaigns: sentCampaigns.length,
          draftCampaigns: campaignsData.data?.filter((c: any) => c.attributes?.status?.toLowerCase() === 'draft')?.length || 0,
          scheduledCampaigns: campaignsData.data?.filter((c: any) => c.attributes?.status?.toLowerCase() === 'scheduled')?.length || 0,
          // Flow metrics
          totalFlows: flows.length,
          activeFlows,
          draftFlows,
          // Segment metrics
          totalSegments: segments.length,
          // Aggregate email stats
          ...aggregateStats,
        },
        campaigns,
        flows,
        lists,
        segments,
        tags: (tagsData.data || []).map((tag: any) => ({
          id: tag.id,
          name: tag.attributes?.name,
        })),
      },
    })
  } catch (error: any) {
    console.error('Klaviyo data API error:', error)
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch Klaviyo data',
    })
  }
}
