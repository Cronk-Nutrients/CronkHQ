'use client';

import { useState } from 'react';
import { AdPlatformHeader, MetricsGrid, SecondaryMetricsGrid, CampaignTable, CampaignNameCell, TypeBadge, RoasBadge, CurrencyCell, NumberCell, InsightCard, BreakdownCard, TipBox } from '@/components/marketing';
import { tiktokAdsAccount, tiktokAdsMetrics, tiktokAdsCampaigns, tiktokTopCreatives, tiktokAudienceBreakdown } from '@/data/marketing';

export default function TikTokAdsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const primaryMetrics = [
    { label: 'Spend', value: tiktokAdsMetrics.spend, format: 'currency' as const },
    { label: 'Revenue', value: tiktokAdsMetrics.revenue, format: 'currency' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'ROAS', value: tiktokAdsMetrics.roas, format: 'multiplier' as const, highlight: true, highlightColor: 'amber' as const },
    { label: 'Conversions', value: tiktokAdsMetrics.orders, format: 'number' as const },
    { label: 'Video Views', value: tiktokAdsMetrics.videoViews, format: 'thousands' as const },
  ];

  const secondaryMetrics = [
    { label: 'Clicks', value: tiktokAdsMetrics.clicks, format: 'number' as const },
    { label: 'Impressions', value: tiktokAdsMetrics.impressions, format: 'number' as const },
    { label: 'CTR', value: tiktokAdsMetrics.ctr, format: 'percent' as const },
    { label: 'Engagement Rate', value: tiktokAdsMetrics.engagementRate, format: 'percent' as const },
  ];

  const campaignColumns = [
    { key: 'name', header: 'Campaign', render: (v: unknown, row: typeof tiktokAdsCampaigns[0]) => <CampaignNameCell name={row.name} active={row.status === 'active'} /> },
    { key: 'objective', header: 'Objective', render: (v: unknown) => <TypeBadge type={v as string} /> },
    { key: 'spend', header: 'Spend', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
    { key: 'roas', header: 'ROAS', align: 'right' as const, render: (v: unknown) => <RoasBadge roas={v as number} thresholds={{ high: 4, medium: 3 }} /> },
    { key: 'conversions', header: 'Conversions', align: 'right' as const, render: (v: unknown) => <NumberCell value={v as number} /> },
    { key: 'videoViews', header: 'Video Views', align: 'right' as const, render: (v: unknown) => <span className="text-slate-300">{((v as number) / 1000).toFixed(1)}K</span> },
  ];

  return (
    <div className="space-y-6">
      <AdPlatformHeader
        platformName="TikTok Ads"
        platformIcon="fab fa-tiktok"
        platformColor="#000000"
        accountName={tiktokAdsAccount.accountName}
        accountId={tiktokAdsAccount.advertiserId}
        lastSync={tiktokAdsAccount.lastSync}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onSync={() => {}}
        externalLinkLabel="Open in TikTok Ads"
        onExternalLink={() => window.open('https://ads.tiktok.com', '_blank')}
      />

      <MetricsGrid metrics={primaryMetrics} columns={5} />
      <SecondaryMetricsGrid metrics={secondaryMetrics} columns={4} />

      <CampaignTable
        title="Campaigns"
        subtitle={`${tiktokAdsCampaigns.length} active campaigns`}
        columns={campaignColumns}
        data={tiktokAdsCampaigns}
        getRowKey={(row) => row.id}
        headerAction={{ label: 'Open in TikTok Ads', icon: 'fas fa-external-link-alt', onClick: () => {} }}
      />

      <div className="grid grid-cols-2 gap-6">
        <InsightCard
          title="Top Creatives"
          subtitle="By conversion rate"
          items={tiktokTopCreatives.map(c => ({ label: c.creative, sublabel: `${(c.views / 1000).toFixed(1)}K views`, value: `${c.cvr}% CVR` }))}
        />
        <BreakdownCard
          title="Audience Insights"
          subtitle="Demographics breakdown"
          items={tiktokAudienceBreakdown.map(a => ({ label: a.label, value: `${a.percentage}%`, percentage: a.percentage, color: a.color }))}
        />
      </div>

      <TipBox
        title="TikTok Creative Best Practices"
        content="Use vertical video (9:16), hook viewers in the first 3 seconds, leverage trending sounds, and feature authentic UGC content. TikTok rewards native-feeling content over polished ads."
        icon="fab fa-tiktok"
        variant="cyan"
      />
    </div>
  );
}
