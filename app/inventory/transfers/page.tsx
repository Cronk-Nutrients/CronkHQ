'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp, StockTransfer } from '@/context/AppContext';
import { useToast } from '@/components/ui/Toast';
import { CreateTransferModal } from '@/components/modals';
import { StatusBadge, transferStatusConfig } from '@/components/inventory/StatusBadge';
import { ClickableStatCard, InventoryStatsGrid } from '@/components/inventory/InventoryStats';
import { SearchInput, FilterSelect, ClearFiltersButton, FilterBar, PageHeader } from '@/components/inventory/InventoryFilters';
import { EmptyState, Pagination, TableWrapper, ActionButton, PrimaryActionButton } from '@/components/inventory/InventoryTable';

type StatusFilter = StockTransfer['status'] | '';

function TransfersPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { state, dispatch } = useApp();
  const { success, warning } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(
    (searchParams.get('status') as StatusFilter) || ''
  );
  const [fromLocationFilter, setFromLocationFilter] = useState('');
  const [toLocationFilter, setToLocationFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransfers = useMemo(() => {
    return state.transfers.filter(transfer => {
      const matchesSearch =
        transfer.transferNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transfer.items.some(item =>
          item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sku.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesStatus = !statusFilter || transfer.status === statusFilter;
      const matchesFrom = !fromLocationFilter || transfer.fromLocation === fromLocationFilter;
      const matchesTo = !toLocationFilter || transfer.toLocation === toLocationFilter;
      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [state.transfers, searchQuery, statusFilter, fromLocationFilter, toLocationFilter]);

  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const paginatedTransfers = filteredTransfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const stats = useMemo(() => {
    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    return {
      pending: state.transfers.filter(t => t.status === 'pending').length,
      inTransit: state.transfers.filter(t => t.status === 'in_transit').length,
      receivedThisWeek: state.transfers.filter(
        t => t.status === 'received' && t.receivedAt && new Date(t.receivedAt) >= thisWeek
      ).length,
      total: state.transfers.length,
    };
  }, [state.transfers]);

  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });

  const handleStatClick = (status: StatusFilter) => {
    setStatusFilter(prev => prev === status ? '' : status);
    setCurrentPage(1);
  };

  const handleCancel = (transfer: StockTransfer, e: React.MouseEvent) => {
    e.stopPropagation();
    if (transfer.status === 'in_transit') {
      warning('Cannot cancel a transfer that is already in transit');
      return;
    }
    dispatch({
      type: 'UPDATE_TRANSFER',
      payload: { ...transfer, status: 'cancelled', updatedAt: new Date() }
    });
    success(`Transfer ${transfer.transferNumber} cancelled`);
  };

  const hasFilters = searchQuery || statusFilter || fromLocationFilter || toLocationFilter;
  const locationOptions = state.locations.map(loc => ({ value: loc.id, label: loc.name }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Transfers"
        subtitle="Move inventory between locations"
        backHref="/inventory"
        actions={<PrimaryActionButton icon="fa-plus" label="New Transfer" onClick={() => setIsCreateModalOpen(true)} />}
      />

      <InventoryStatsGrid>
        <ClickableStatCard
          icon="fa-clock"
          iconColor="amber"
          value={stats.pending}
          label="Pending Approval"
          onClick={() => handleStatClick('pending')}
          isActive={statusFilter === 'pending'}
        />
        <ClickableStatCard
          icon="fa-truck"
          iconColor="blue"
          value={stats.inTransit}
          label="In Transit"
          onClick={() => handleStatClick('in_transit')}
          isActive={statusFilter === 'in_transit'}
        />
        <ClickableStatCard
          icon="fa-check"
          iconColor="emerald"
          value={stats.receivedThisWeek}
          label="Received This Week"
          onClick={() => handleStatClick('received')}
          isActive={statusFilter === 'received'}
        />
        <ClickableStatCard
          icon="fa-exchange-alt"
          iconColor="slate"
          value={stats.total}
          label="Total Transfers"
        />
      </InventoryStatsGrid>

      <FilterBar>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search transfers..."
        />
        <FilterSelect
          value={statusFilter}
          onChange={(v) => { setStatusFilter(v as StatusFilter); setCurrentPage(1); }}
          placeholder="All Statuses"
          options={[
            { value: 'draft', label: 'Draft' },
            { value: 'pending', label: 'Pending' },
            { value: 'in_transit', label: 'In Transit' },
            { value: 'received', label: 'Received' },
            { value: 'cancelled', label: 'Cancelled' },
          ]}
        />
        <FilterSelect
          value={fromLocationFilter}
          onChange={(v) => { setFromLocationFilter(v); setCurrentPage(1); }}
          placeholder="All Sources"
          options={locationOptions}
        />
        <FilterSelect
          value={toLocationFilter}
          onChange={(v) => { setToLocationFilter(v); setCurrentPage(1); }}
          placeholder="All Destinations"
          options={locationOptions}
        />
        {hasFilters && (
          <ClearFiltersButton onClick={() => {
            setSearchQuery('');
            setStatusFilter('');
            setFromLocationFilter('');
            setToLocationFilter('');
            setCurrentPage(1);
          }} />
        )}
      </FilterBar>

      <TableWrapper>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Transfer #</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">From</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">To</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Items</th>
              <th className="text-left p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
              <th className="text-right p-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransfers.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState
                    icon="fa-exchange-alt"
                    title="No transfers found"
                    description={hasFilters ? 'Try adjusting your filters' : 'Create a transfer to move inventory between locations'}
                    showFilterHint={hasFilters}
                  />
                </td>
              </tr>
            ) : (
              paginatedTransfers.map((transfer) => {
                const totalUnits = transfer.items.reduce((sum, i) => sum + i.requestedQty, 0);
                return (
                  <tr
                    key={transfer.id}
                    className="border-b border-slate-700/30 hover:bg-slate-700/30 cursor-pointer transition-colors"
                    onClick={() => router.push(`/inventory/transfers/${transfer.id}`)}
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">{transfer.transferNumber}</div>
                    </td>
                    <td className="p-4 text-slate-300">{formatDate(transfer.createdAt)}</td>
                    <td className="p-4 text-slate-300">{transfer.fromLocationName}</td>
                    <td className="p-4 text-slate-300">{transfer.toLocationName}</td>
                    <td className="p-4">
                      <div className="text-slate-200">
                        {transfer.items.length} item{transfer.items.length !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-slate-500">{totalUnits} units</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={transfer.status} config={transferStatusConfig} />
                    </td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        {(transfer.status === 'draft' || transfer.status === 'pending') && (
                          <ActionButton
                            icon="fa-times"
                            color="red"
                            title="Cancel Transfer"
                            onClick={(e) => handleCancel(transfer, e)}
                          />
                        )}
                        <ActionButton
                          icon="fa-chevron-right"
                          title="View Details"
                          onClick={() => router.push(`/inventory/transfers/${transfer.id}`)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredTransfers.length}
          itemsPerPage={itemsPerPage}
          itemLabel="transfers"
          onPageChange={setCurrentPage}
        />
      </TableWrapper>

      <CreateTransferModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}

export default function TransfersPage() {
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
      <TransfersPageContent />
    </Suspense>
  );
}
