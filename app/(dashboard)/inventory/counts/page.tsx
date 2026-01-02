'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockCount } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { formatCurrency } from '@/lib/formatting';
import { CreateStockCountModal } from '@/components/modals';
import {
  StatusBadge,
  TypeBadge,
  stockCountStatusConfig,
  countTypeConfig,
} from '@/components/inventory/StatusBadge';
import { ClickableStatCard, InventoryStatsGrid, ProgressBar } from '@/components/inventory/InventoryStats';
import { SearchInput, FilterSelect, ClearFiltersButton, FilterBar, PageHeader } from '@/components/inventory/InventoryFilters';
import { EmptyState, Pagination, TableWrapper, ActionButton, PrimaryActionButton } from '@/components/inventory/InventoryTable';

type StatusFilter = StockCount['status'] | '';
type TypeFilter = StockCount['type'] | '';

function StockCountsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    (searchParams.get('status') as StatusFilter) || ''
  );
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCounts = useMemo(() => {
    return state.stockCounts.filter(count => {
      const matchesSearch =
        count.countNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        count.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        count.locationName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = !statusFilter || count.status === statusFilter;
      const matchesType = !typeFilter || count.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [state.stockCounts, searchQuery, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredCounts.length / itemsPerPage);
  const paginatedCounts = filteredCounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = useMemo(() => {
    const today = new Date();
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      activeCounts: state.stockCounts.filter(c => c.status === 'in_progress').length,
      completedThisMonth: state.stockCounts.filter(
        c => c.status === 'completed' && c.completedAt && new Date(c.completedAt) >= thisMonth
      ).length,
      discrepancyItems: state.stockCounts
        .filter(c => c.status === 'in_progress' || c.status === 'completed')
        .reduce((sum, c) => sum + c.summary.discrepancyItems, 0),
      totalVariance: state.stockCounts
        .filter(c => c.status === 'completed')
        .reduce((sum, c) => sum + c.summary.totalVariance, 0),
    };
  }, [state.stockCounts]);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleDelete = (count: StockCount, e: React.MouseEvent) => {
    e.stopPropagation();
    if (count.status === 'in_progress') {
      warning('Cannot delete an active count. Cancel it first.');
      return;
    }
    dispatch({ type: 'DELETE_STOCK_COUNT', payload: count.id });
    success(`Stock count ${count.countNumber} deleted`);
  };

  const handleStatClick = (status: StatusFilter) => {
    setStatusFilter(prev => prev === status ? '' : status);
    setCurrentPage(1);
  };

  const hasFilters = !!(searchQuery || statusFilter || typeFilter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Counts"
        subtitle="Physical inventory verification"
        backHref="/inventory"
        actions={<PrimaryActionButton icon="fa-plus" label="New Count" onClick={() => setIsCreateModalOpen(true)} />}
      />

      <InventoryStatsGrid>
        <ClickableStatCard
          icon="fa-clipboard-list"
          iconColor="blue"
          value={stats.activeCounts}
          label="Active Counts"
          onClick={() => handleStatClick('in_progress')}
          isActive={statusFilter === 'in_progress'}
        />
        <ClickableStatCard
          icon="fa-check-circle"
          iconColor="emerald"
          value={stats.completedThisMonth}
          label="Completed This Month"
          onClick={() => handleStatClick('completed')}
          isActive={statusFilter === 'completed'}
        />
        <ClickableStatCard
          icon="fa-exclamation-triangle"
          iconColor="amber"
          value={stats.discrepancyItems}
          label="Items with Discrepancy"
        />
        <ClickableStatCard
          icon="fa-dollar-sign"
          iconColor={stats.totalVariance >= 0 ? 'emerald' : 'red'}
          value={Math.abs(stats.totalVariance)}
          format="currency"
          label="Total Variance Value"
        />
      </InventoryStatsGrid>

      <FilterBar>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search counts..."
        />
        <FilterSelect
          value={statusFilter}
          onChange={(v) => { setStatusFilter(v as StatusFilter); setCurrentPage(1); }}
          placeholder="All Statuses"
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'in_progress', label: 'In Progress' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
        <FilterSelect
          value={typeFilter}
          onChange={(v) => { setTypeFilter(v as TypeFilter); setCurrentPage(1); }}
          placeholder="All Types"
          options={[
            { value: 'full', label: 'Full Count' },
            { value: 'cycle', label: 'Cycle Count' },
            { value: 'spot', label: 'Spot Check' },
          ]}
        />
        {hasFilters && (
          <ClearFiltersButton onClick={() => {
            setSearchQuery('');
            setStatusFilter('');
            setTypeFilter('');
            setCurrentPage(1);
          }} />
        )}
      </FilterBar>

      <TableWrapper>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Count #</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Progress</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Started</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCounts.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <EmptyState
                    icon="fa-clipboard-check"
                    title="No stock counts found"
                    description={hasFilters ? 'Try adjusting your filters' : 'Create your first stock count to verify inventory'}
                    showFilterHint={hasFilters}
                  />
                </td>
              </tr>
            ) : (
              paginatedCounts.map((count) => (
                <tr
                  key={count.id}
                  className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => router.push(`/inventory/counts/${count.id}`)}
                >
                  <td className="p-4">
                    <div className="font-medium text-white">{count.countNumber}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-slate-200">{count.name}</div>
                    {count.assignedTo && (
                      <div className="text-xs text-slate-500">Assigned to: {count.assignedTo}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <TypeBadge type={count.type} config={countTypeConfig} />
                  </td>
                  <td className="p-4 text-slate-300">{count.locationName}</td>
                  <td className="p-4">
                    <ProgressBar
                      current={count.summary.countedItems}
                      total={count.summary.totalItems}
                      completed={count.status === 'completed'}
                    />
                  </td>
                  <td className="p-4">
                    <StatusBadge
                      status={count.status}
                      config={stockCountStatusConfig}
                      animated={count.status === 'in_progress'}
                    />
                  </td>
                  <td className="p-4 text-slate-300">
                    {count.startedAt ? formatDate(count.startedAt) : '-'}
                  </td>
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {count.status === 'draft' && (
                        <ActionButton
                          icon="fa-play"
                          color="blue"
                          title="Start Count"
                          onClick={() => router.push(`/inventory/counts/${count.id}`)}
                        />
                      )}
                      {count.status === 'in_progress' && (
                        <ActionButton
                          icon="fa-arrow-right"
                          color="emerald"
                          title="Continue Count"
                          onClick={() => router.push(`/inventory/counts/${count.id}`)}
                        />
                      )}
                      {count.status !== 'in_progress' && (
                        <ActionButton
                          icon="fa-trash"
                          color="red"
                          title="Delete"
                          onClick={(e) => handleDelete(count, e)}
                        />
                      )}
                      <ActionButton
                        icon="fa-chevron-right"
                        title="View Details"
                        onClick={() => router.push(`/inventory/counts/${count.id}`)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredCounts.length}
          itemsPerPage={itemsPerPage}
          itemLabel="counts"
          onPageChange={setCurrentPage}
        />
      </TableWrapper>

      <CreateStockCountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default function StockCountsPage() {
  return (
    <Suspense fallback={
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-800/50 rounded w-48"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-xl"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-800/50 rounded-xl"></div>
      </div>
    }>
      <StockCountsPageContent />
    </Suspense>
  );
}
