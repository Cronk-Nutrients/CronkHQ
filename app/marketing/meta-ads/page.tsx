'use client';

import { useState } from 'react';
import { AdPlatformHeader, MetricsGrid, SecondaryMetricsGrid, CampaignTable, CampaignNameCell, TypeBadge, RoasBadge, CurrencyCell, NumberCell, InsightCard } from '@/components/marketing';
import { metaAdsAccount, metaAdsMetrics, metaAdsCampaigns, metaTopAudiences, metaTopCreatives } from '@/data/marketing';

export default function MetaAdsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const primaryMetrics = [
    { label: 'Spend', value: metaAdsMetrics.spend, format: 'currency' as const },
    { label: 'Revenue', value: metaAdsMetrics.revenue, format: 'currency' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'ROAS', value: metaAdsMetrics.roas, format: 'multiplier' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'Purchases', value: metaAdsMetrics.orders, format: 'number' as const },
    { label: 'Reach', value: metaAdsMetrics.reach, format: 'thousands' as const },
  ];

  const secondaryMetrics = [
    { label: 'Clicks', value: metaAdsMetrics.clicks, format: 'number' as const },
    { label: 'Impressions', value: metaAdsMetrics.impressions, format: 'number' as const },
    { label: 'CTR', value: metaAdsMetrics.ctr, format: 'percent' as const },
    { label: 'Frequency', value: metaAdsMetrics.frequency, format: 'number' as const },
  ];

  const campaignColumns = [
    { key: 'name', header: 'Campaign', render: (v: unknown, row: typeof metaAdsCampaigns[0]) => <CampaignNameCell name={row.name} active={row.status === 'active'} /> },
    { key: 'objective', header: 'Objective', render: (v: unknown) => <TypeBadge type={v as string} /> },
    { key: 'spend', header: 'Spend', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
    { key: 'roas', header: 'ROAS', align: 'right' as const, render: (v: unknown) => <RoasBadge roas={v as number} /> },
    { key: 'purchases', header: 'Purchases', align: 'right' as const, render: (v: unknown) => <NumberCell value={v as number} /> },
    { key: 'reach', header: 'Reach', align: 'right' as const, render: (v: unknown) => <span className="text-slate-300">{((v as number) / 1000).toFixed(1)}K</span> },
  ];

  return (
    <div className="space-y-6">
      <AdPlatformHeader
        platformName="Meta Ads"
        platformIcon="fab fa-meta"
        platformColor="#0081fb"
        accountName={metaAdsAccount.accountName}
        accountId={metaAdsAccount.accountId}
        lastSync={metaAdsAccount.lastSync}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onSync={() => {}}
        externalLinkLabel="Open in Ads Manager"
        onExternalLink={() => window.open('https://business.facebook.com', '_blank')}
      />

      <MetricsGrid metrics={primaryMetrics} columns={5} />
      <SecondaryMetricsGrid metrics={secondaryMetrics} columns={4} />

      <CampaignTable
        title="Campaigns"
        subtitle={`${metaAdsCampaigns.length} active campaigns`}
        columns={campaignColumns}
        data={metaAdsCampaigns}
        getRowKey={(row) => row.id}
        headerAction={{ label: 'Open in Ads Manager', icon: 'fas fa-external-link-alt', onClick: () => {} }}
      />

      <div className="grid grid-cols-2 gap-6">
        <InsightCard
          title="Top Audiences"
          subtitle="By purchase conversion"
          items={metaTopAudiences.map(a => ({ label: a.audience, sublabel: `ROAS: ${a.roas}x`, value: `${a.purchases} purchases` }))}
        />
        <InsightCard
          title="Top Creatives"
          subtitle="By performance"
          items={metaTopCreatives.map(c => ({ label: c.creative, sublabel: `CTR: ${c.ctr}%`, value: `${c.purchases} purchases` }))}
        />
      </div>
    </div>
  );
}
