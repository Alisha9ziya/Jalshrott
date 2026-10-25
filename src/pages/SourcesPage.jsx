import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiPlus, FiRefreshCw, FiSearch, FiDownload } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import SourceFilters from '../components/sources/SourceFilters';
import SourceTable from '../components/sources/SourceTable';
import SourceDetailsModal from '../components/sources/SourceDetailsModal';
import SourceFormModal from '../components/sources/SourceFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import { TableSkeleton } from '../components/ui/Spinner';
import { useSources } from '../hooks/useSources';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { deleteSource } from '../api/sources';
import { filterSources, searchSources } from '../lib/source';

const PAGE_SIZE = 10;

const emptyFilters = {
  search: '',
  state: '',
  district: '',
  type: '',
  condition: '',
  potableOnly: false,
};

export default function SourcesPage() {
  const { sources, loading, error, reload } = useSources();
  const { canManageSources, token } = useAuth();
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    ...emptyFilters,
    type: searchParams.get('type') || '',
  }));
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const filtered = useMemo(
    () => searchSources(filterSources(sources, filters), filters.search),
    [sources, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const hasFilters = Boolean(
    filters.search || filters.state || filters.district || filters.type || filters.condition || filters.potableOnly
  );

  useEffect(() => {
    if (filters.type) setSearchParams({ type: filters.type }, { replace: true });
    else setSearchParams({}, { replace: true });
  }, [filters.type, setSearchParams]);

  const handleFilterChange = (partial) => {
    setFilters((current) => ({ ...current, ...partial }));
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({ ...emptyFilters });
    setPage(1);
  };

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (source) => {
    setSelected(null);
    setEditing(source);
    setFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeletingLoading(true);
    try {
      await deleteSource(token, deleting.id);
      toast.success(`"${deleting.name}" was removed from the registry.`);
      setDeleting(null);
      reload();
    } catch (err) {
      toast.error(err.message || 'Could not delete this source.');
    } finally {
      setDeletingLoading(false);
    }
  };

  const exportCsv = () => {
    const header = [
      'Name', 'Type', 'Village', 'District', 'State',
      'Latitude', 'Longitude', 'Duration', 'Area (m2)', 'Volume (m3)',
      'pH', 'TDS',
    ];
    const rows = filtered.map((source) => [
      source.name,
      source.sourceType,
      source.village,
      source.district,
      source.state,
      source.latitude,
      source.longitude,
      source.duration,
      source.area ?? '',
      source.volume ?? '',
      source.ph ?? '',
      source.quality?.tds ?? '',
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'jalsrot-water-sources.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        eyebrow="Public registry"
        title="Water Sources"
        description="Explore all documented water sources and view their complete details."
        actions={
          <>
            <Button
              variant="outline"
              size="md"
              onClick={exportCsv}
              icon={<FiDownload size={15} />}
              disabled={!filtered.length}
            >
              Export CSV
            </Button>
            {canManageSources && (
              <Button onClick={openAdd} icon={<FiPlus size={15} />}>
                Add source
              </Button>
            )}
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-ink-200 bg-white p-4 shadow-soft dark:border-ink-800 dark:bg-ink-900">
          <SourceFilters
            filters={filters}
            onChange={handleFilterChange}
            onReset={resetFilters}
            sources={sources}
          />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-ink-500 dark:text-ink-400">
            {loading
              ? 'Loading sources…'
              : `Showing ${filtered.length} source${filtered.length === 1 ? '' : 's'}${
                  hasFilters ? ' matching your filters' : ''
                }`}
          </p>
          <button
            type="button"
            onClick={reload}
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <FiRefreshCw size={12} /> Refresh
          </button>
        </div>

        <div className="mt-3">
          {loading ? (
            <TableSkeleton rows={8} />
          ) : error ? (
            <EmptyState
              icon={FiSearch}
              title="Could not load water sources"
              description={error}
              action={
                <Button variant="outline" onClick={reload} icon={<FiRefreshCw size={14} />}>
                  Try again
                </Button>
              }
            />
          ) : pageItems.length ? (
            <SourceTable
              sources={pageItems}
              startIndex={(currentPage - 1) * PAGE_SIZE + 1}
              onView={setSelected}
              onEdit={canManageSources ? openEdit : undefined}
              onDelete={canManageSources ? setDeleting : undefined}
              readOnly={!canManageSources}
            />
          ) : (
            <EmptyState
              icon={FiSearch}
              title={hasFilters ? 'No sources match your filters' : 'No water sources documented yet'}
              description={
                hasFilters
                  ? 'Try a different district, resource type or search term.'
                  : 'Once sources are added by an administrator they will appear here.'
              }
              action={
                hasFilters ? (
                  <Button variant="outline" onClick={resetFilters}>
                    Clear filters
                  </Button>
                ) : null
              }
            />
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-400">
            {filtered.length > 0 &&
              `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
          </p>
          <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>

      <SourceDetailsModal
        source={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        onEdit={openEdit}
        canManage={canManageSources}
      />

      {formOpen && (
        <SourceFormModal
          open
          source={editing}
          onClose={() => setFormOpen(false)}
          onSaved={reload}
        />
      )}

      <ConfirmDialog
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deletingLoading}
        confirmLabel="Delete source"
        title="Delete this water source?"
        description={
          deleting
            ? `"${deleting.name}" will be permanently removed from the registry. This cannot be undone.`
            : ''
        }
      />
    </>
  );
}
