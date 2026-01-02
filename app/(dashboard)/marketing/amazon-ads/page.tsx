'use client';

import { useState } from 'react';
import { AdPlatformHeader, MetricsGrid, SecondaryMetricsGrid, CampaignTable, CampaignNameCell, TypeBadge, AcosBadge, CurrencyCell, NumberCell, InsightCard, TipBox } from '@/components/marketing';
import { amazonAdsAccount, amazonAdsMetrics, amazonAdsCampaigns, amazonTopSearchTerms, amazonTopProducts } from '@/data/marketing';

export default function AmazonAdsPage() {
  const [dateRange, setDateRange] = useState('30d');

  const getTypeVariant = (type: string) => {
    if (type === 'Sponsored Products') return 'blue' as const;
    if (type === 'Sponsored Brands') return 'purple' as const;
    return 'orange' as const;
  };

  const primaryMetrics = [
    { label: 'Ad Spend', value: amazonAdsMetrics.spend, format: 'currency' as const },
    { label: 'Ad Revenue', value: amazonAdsMetrics.revenue, format: 'currency' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'ROAS', value: amazonAdsMetrics.roas, format: 'multiplier' as const, highlight: true, highlightColor: 'emerald' as const },
    { label: 'ACoS', value: amazonAdsMetrics.acos, format: 'percent' as const, highlight: true, highlightColor: 'amber' as const },
    { label: 'TACoS', value: amazonAdsMetrics.tacos, format: 'percent' as const },
  ];

  const secondaryMetrics = [
    { label: 'Orders', value: amazonAdsMetrics.orders, format: 'number' as const },
    { label: 'Clicks', value: amazonAdsMetrics.clicks, format: 'number' as const },
    { label: 'Impressions', value: amazonAdsMetrics.impressions, format: 'number' as const },
    { label: 'Avg. CPC', value: amazonAdsMetrics.cpc, format: 'currency' as const },
  ];

  const campaignColumns = [
    { key: 'name', header: 'Campaign', render: (v: unknown, row: typeof amazonAdsCampaigns[0]) => <CampaignNameCell name={row.name} active={row.status === 'active'} /> },
    { key: 'type', header: 'Type', render: (v: unknown, row: typeof amazonAdsCampaigns[0]) => <TypeBadge type={row.type} variant={getTypeVariant(row.type)} /> },
    { key: 'spend', header: 'Spend', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} /> },
    { key: 'revenue', header: 'Revenue', align: 'right' as const, render: (v: unknown) => <CurrencyCell value={v as number} variant="success" /> },
    { key: 'acos', header: 'ACoS', align: 'right' as const, render: (v: unknown) => <AcosBadge acos={v as number} /> },
    { key: 'orders', header: 'Orders', align: 'right' as const, render: (v: unknown) => <NumberCell value={v as number} /> },
    { key: 'impressions', header: 'Impressions', align: 'right' as const, render: (v: unknown) => <NumberCell value={v as number} variant="muted" /> },
  ];

  return (
    <div className="space-y-6">
      <AdPlatformHeader
        platformName="Amazon Ads"
        platformIcon="fab fa-amazon"
        platformColor="#ff9900"
        accountName={amazonAdsAccount.accountName}
        accountId={amazonAdsAccount.sellerId}
        lastSync={amazonAdsAccount.lastSync}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onSync={() => {}}
        externalLinkLabel="Open in Amazon Ads"
        onExternalLink={() => window.open('https://advertising.amazon.com', '_blank')}
      />

      <MetricsGrid metrics={primaryMetrics} columns={5} />
      <SecondaryMetricsGrid metrics={secondaryMetrics} columns={4} />

      <CampaignTable
        title="Campaigns"
        subtitle={`${amazonAdsCampaigns.length} active campaigns`}
        columns={campaignColumns}
        data={amazonAdsCampaigns}
        getRowKey={(row) => row.id}
        headerAction={{ label: 'Open in Amazon Ads', icon: 'fas fa-external-link-alt', onClick: () => {} }}
      />

      <div className="grid grid-cols-2 gap-6">
        <InsightCard
          title="Top Search Terms"
          subtitle="By revenue"
          items={amazonTopSearchTerms.map(t => ({ label: t.term, sublabel: `ACoS: ${t.acos}%`, value: t.revenue, valueFormat: 'currency' as const }))}
        />
        <InsightCard
          title="Top Products"
          subtitle="By ad-attributed sales"
          items={amazonTopProducts.map(p => ({ label: p.product, sublabel: `${p.orders} orders`, value: p.revenue, valueFormat: 'currency' as const }))}
        />
      </div>

      <TipBox
        title="Understanding Amazon Metrics"
        content="ACoS (Advertising Cost of Sales) = Ad Spend / Ad Revenue. Lower is better. Target <20% for most products. TACoS (Total ACoS) = Ad Spend / Total Revenue. Shows advertising efficiency across all sales."
        icon="fas fa-info-circle"
        variant="amber"
      />
    </div>
  );
}
