'use client';

import { useState } from 'react';
import { AdPlatformHeader, MetricsGrid, SecondaryMetricsGrid, CampaignTable, CampaignNameCell, TypeBadge, RoasBadge, CurrencyCell, NumberCell, InsightCard } from '@/components/marketing';
import { googleAdsAccount, googleAdsMetrics, googleAdsCampaigns, googleTopKeywords, googleTopProducts } from '@/data/marketing';

export default function GoogleAdsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const primaryMetrics = [
    { label: 'Spend', value: googleAdsMetrics.spend, format: 'currency' as const },
    { label: 'Revenue', value: googleAdsMetrics.revenue, format: 'currency' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'ROAS', value: googleAdsMetrics.roas, format: 'multiplier' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'Orders', value: googleAdsMetrics.orders, format: 'number' as const },
    { label: 'Conv. Rate', value: googleAdsMetrics.conversionRate, format: 'percent' as const },
  ];

  const secondaryMetrics = [
    { label: 'Clicks', value: googleAdsMetrics.clicks, format: 'number' as const },
    { label: 'Impressions', value: googleAdsMetrics.impressions, format: 'number' as const },
    { label: 'CTR', value: googleAdsMetrics.ctr, format: 'percent' as const },
    { label: 'Avg. CPC', value: googleAdsMetrics.cpc, format: 'currency' as const },
  ];

  const campaignColumns = [
    { key: 'name', header: 'Campaign', render: (v: unknown, row: typeof googleAdsCampaigns[0]) => <CampaignNameCell name={row.name} active={row.status === 'active'} /> },
    { key: 'type', header: 'Type', render: (v: unknown) => <TypeBadge type={v as string} /> },
    { key: 'spend', header: 'Spend', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
    { key: 'roas', header: 'ROAS', align: 'right' as const, render: (v: unknown) => <RoasBadge roas={v as number} thresholds={{ high: 6, medium: 4 }} /> },
    { key: 'conversions', header: 'Conversions', align: 'right' as const, render: (v: unknown) => <NumberCell value={v as number} /> },
    { key: 'ctr', header: 'CTR', align: 'right' as const, render: (v: unknown) => <span className="text-slate-300">{(v as number).toFixed(2)}%</span> },
  ];

  return (
    <div className="space-y-6">
      <AdPlatformHeader
        platformName="Google Ads"
        platformIcon="fab fa-google"
        platformColor="#4285f4"
        accountName={googleAdsAccount.accountName}
        accountId={googleAdsAccount.accountId}
        lastSync={googleAdsAccount.lastSync}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onSync={() => {}}
        externalLinkLabel="Open in Google Ads"
        onExternalLink={() => window.open('https://ads.google.com', '_blank')}
      />

      <MetricsGrid metrics={primaryMetrics} columns={5} />
      <SecondaryMetricsGrid metrics={secondaryMetrics} columns={4} />

      <CampaignTable
        title="Campaigns"
        subtitle={`${googleAdsCampaigns.length} active campaigns`}
        columns={campaignColumns}
        data={googleAdsCampaigns}
        getRowKey={(row) => row.id}
        headerAction={{ label: 'Open in Google Ads', icon: 'fas fa-external-link-alt', onClick: () => {} }}
      />

      <div className="grid grid-cols-2 gap-6">
        <InsightCard
          title="Top Keywords"
          subtitle="By conversion value"
          items={googleTopKeywords.map(k => ({ label: k.keyword, sublabel: `ROAS: ${k.roas}x`, value: k.revenue, valueFormat: 'currency' as const }))}
        />
        <InsightCard
          title="Top Products"
          subtitle="Shopping campaign performance"
          items={googleTopProducts.map(p => ({ label: p.product, sublabel: `${p.conversions} conversions`, value: p.revenue, valueFormat: 'currency' as const }))}
        />
      </div>
    </div>
  );
}
