import { useEffect, useMemo, useState } from 'react';
import {
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiUsers,
  FiDatabase,
  FiCheckCircle,
  FiMapPin,
  FiSearch,
  FiSave,
} from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import SourceFilters from '../components/sources/SourceFilters';
import SourceTable from '../components/sources/SourceTable';
import SourceDetailsModal from '../components/sources/SourceDetailsModal';
import SourceFormModal from '../components/sources/SourceFormModal';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import EmptyState from '../components/ui/EmptyState';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Field, Input } from '../components/ui/Field';
import { LoadingPanel, TableSkeleton } from '../components/ui/Spinner';
import { useSources } from '../hooks/useSources';
import { useAuth } from '../context/AuthContext';
import { useAuthDialog } from '../context/AuthDialogContext';
import { useToast } from '../context/ToastContext';
import { deleteSource } from '../api/sources';
import { listUsersRequest, setSourcePermissionRequest } from '../api/auth';
import { filterSources, searchSources, uniqueValues } from '../lib/source';

const PAGE_SIZE = 10;

const emptyFilters = {
  search: '',
  state: '',
  district: '',
  type: '',
  condition: '',
  potableOnly: false,
};

const StatCard = ({ icon: Icon, label, value, tone = 'brand' }) => {
  const tones = {
    brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300',
    violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300',
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
      <span className={`grid h-10 w-10 place-items-center rounded-lg ${tones[tone]}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="font-display text-xl font-bold leading-none text-ink-900 dark:text-white">{value}</p>
        <p className="mt-1 text-xs font-medium text-ink-500 dark:text-ink-400">{label}</p>
      </div>
    </div>
  );
};

function RegionCard({ user, stateOptions }) {
  const { updateRegion } = useAuth();
  const toast = useToast();
  const [region, setRegion] = useState({
    state: user?.state || '',
    district: user?.district || '',
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!region.state.trim() || !region.district.trim()) {
      toast.error('Enter both state and district.');
      return;
    }
    setSaving(true);
    try {
      await updateRegion({ state: region.state.trim(), district: region.district.trim() });
      toast.success('Your region was saved.');
    } catch (err) {
      toast.error(err.message || 'Could not save your region.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-800 dark:text-ink-100">
        <FiMapPin size={15} className="text-brand-600" /> My region
      </h3>
      <p className="mt-1 text-xs text-ink-500 dark:text-ink-400">
        Used for the “My region” shortcut on the map view.
      </p>
      <div className="mt-3 space-y-2.5">
        <Field label="State / UT" htmlFor="admin-state">
          <Input
            id="admin-state"
            value={region.state}
            onChange={(event) => setRegion({ ...region, state: event.target.value })}
            placeholder="Uttarakhand"
            list="admin-states"
          />
          <datalist id="admin-states">
            {stateOptions.map((state) => (
              <option key={state} value={state} />
            ))}
          </datalist>
        </Field>
        <Field label="District" htmlFor="admin-district">
          <Input
            id="admin-district"
            value={region.district}
            onChange={(event) => setRegion({ ...region, district: event.target.value })}
            placeholder="Pauri Garhwal"
          />
        </Field>
        <Button onClick={save} loading={saving} icon={<FiSave size={14} />} className="w-full" size="md">
          Save region
        </Button>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, token, initializing, canManageSources, isGovernment } = useAuth();
  const { openAuth } = useAuthDialog();
  const { sources, stats, loading, error, reload } = useSources();
  const toast = useToast();

  const [tab, setTab] = useState('registry');
  const [filters, setFilters] = useState(emptyFilters);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersRefresh, setUsersRefresh] = useState(0);
  const [permissionBusy, setPermissionBusy] = useState(null);

  useEffect(() => {
    if (tab !== 'access' || !isGovernment || !token) return undefined;
    let active = true;

    const load = async () => {
      setUsersLoading(true);
      try {
        const data = await listUsersRequest(token);
        if (active) setUsers(data.users || []);
      } catch (err) {
        if (active) toast.error(err.message || 'Could not load users.');
      } finally {
        if (active) setUsersLoading(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [tab, isGovernment, token, usersRefresh, toast]);

  const filtered = useMemo(
    () => searchSources(filterSources(sources, filters), filters.search),
    [sources, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

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
      toast.success(`"${deleting.name}" was deleted.`);
      setDeleting(null);
      reload();
    } catch (err) {
      toast.error(err.message || 'Could not delete this source.');
    } finally {
      setDeletingLoading(false);
    }
  };

  const togglePermission = async (targetUser) => {
    setPermissionBusy(targetUser.id);
    try {
      const data = await setSourcePermissionRequest(
        token,
        targetUser.id,
        !targetUser.canManageSources
      );
      setUsers((current) =>
        current.map((item) => (item.id === targetUser.id ? { ...item, ...data.user } : item))
      );
      toast.success('Permission updated.');
    } catch (err) {
      toast.error(err.message || 'Could not update permission.');
    } finally {
      setPermissionBusy(null);
    }
  };

  if (initializing) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <LoadingPanel label="Checking your access…" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState
          icon={FiShield}
          title="Administrator sign in required"
          description="The admin dashboard is available to government users and authorised source managers."
          action={<Button onClick={() => openAuth('login')}>Sign in</Button>}
        />
      </div>
    );
  }

  if (!canManageSources) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20">
        <EmptyState
          icon={FiShield}
          title="You don't have admin access yet"
          description={`Signed in as ${user.email}. Ask a government administrator to grant you source management permission.`}
          action={<Button onClick={reload} variant="outline" icon={<FiRefreshCw size={14} />}>Refresh access</Button>}
        />
      </div>
    );
  }

  const stateOptions = uniqueValues(sources, 'state');

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Admin Dashboard"
        description="Add, update and retire water source records for the public registry."
        actions={
          <>
            <Button variant="outline" onClick={reload} icon={<FiRefreshCw size={15} />}>
              Refresh
            </Button>
            <Button onClick={openAdd} icon={<FiPlus size={15} />}>
              Add source
            </Button>
          </>
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={FiDatabase} label="Total sources" value={stats?.total ?? sources.length} />
          <StatCard
            icon={FiCheckCircle}
            label="Potable sources"
            value={stats?.potable ?? sources.filter((source) => source.isPotable).length}
            tone="emerald"
          />
          <StatCard
            icon={FiShield}
            label="Verified sources"
            value={stats?.verified ?? sources.filter((source) => source.verified).length}
            tone="violet"
          />
          <StatCard
            icon={FiMapPin}
            label="Districts covered"
            value={Object.keys(stats?.byDistrict || {}).length}
            tone="amber"
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
            <div className="flex flex-wrap gap-1 border-b border-ink-100 pb-2 dark:border-ink-800">
              <button
                type="button"
                onClick={() => setTab('registry')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition ${
                  tab === 'registry'
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                    : 'text-ink-500 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800'
                }`}
              >
                <FiDatabase size={13} /> Registry
              </button>
              {isGovernment && (
                <button
                  type="button"
                  onClick={() => setTab('access')}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold transition ${
                    tab === 'access'
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300'
                      : 'text-ink-500 hover:bg-ink-50 dark:text-ink-400 dark:hover:bg-ink-800'
                  }`}
                >
                  <FiUsers size={13} /> User access
                </button>
              )}
            </div>

            {tab === 'registry' ? (
              <div className="pt-4">
                <SourceFilters
                  filters={filters}
                  onChange={(partial) => {
                    setFilters((current) => ({ ...current, ...partial }));
                    setPage(1);
                  }}
                  onReset={() => {
                    setFilters({ ...emptyFilters });
                    setPage(1);
                  }}
                  sources={sources}
                />

                <div className="mt-4">
                  {loading ? (
                    <TableSkeleton rows={8} />
                  ) : error ? (
                    <EmptyState
                      icon={FiSearch}
                      title="Could not load sources"
                      description={error}
                      action={<Button variant="outline" onClick={reload}>Try again</Button>}
                    />
                  ) : pageItems.length ? (
                    <SourceTable
                      sources={pageItems}
                      startIndex={(currentPage - 1) * PAGE_SIZE + 1}
                      onView={setSelected}
                      onEdit={openEdit}
                      onDelete={setDeleting}
                    />
                  ) : (
                    <EmptyState
                      icon={FiDatabase}
                      title="No sources found"
                      description={
                        sources.length
                          ? 'No records match the current filters.'
                          : 'Add the first water source to start building the registry.'
                      }
                      action={
                        sources.length ? (
                          <Button variant="outline" onClick={() => setFilters({ ...emptyFilters })}>
                            Clear filters
                          </Button>
                        ) : (
                          <Button onClick={openAdd} icon={<FiPlus size={14} />}>
                            Add source
                          </Button>
                        )
                      }
                    />
                  )}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-ink-400">
                    {filtered.length
                      ? `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length}`
                      : ''}
                  </p>
                  <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
                </div>
              </div>
            ) : (
              <div className="pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-400">
                    Registered users
                  </p>
                  <button
                    type="button"
                    onClick={() => setUsersRefresh((value) => value + 1)}
                    className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
                  >
                    <FiRefreshCw size={12} /> Refresh
                  </button>
                </div>
                {usersLoading ? (
                  <TableSkeleton rows={4} />
                ) : users.length ? (
                  <div className="thin-scrollbar overflow-x-auto">
                    <table className="w-full min-w-[520px] border-collapse">
                      <thead>
                        <tr className="border-b border-ink-200 text-left text-[11px] uppercase tracking-wider text-ink-400 dark:border-ink-800">
                          <th className="px-3 py-2.5 font-bold">Email</th>
                          <th className="px-3 py-2.5 font-bold">Role</th>
                          <th className="px-3 py-2.5 font-bold">Region</th>
                          <th className="px-3 py-2.5 text-right font-bold">Can manage</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-ink-100 text-sm last:border-0 dark:border-ink-800"
                          >
                            <td className="px-3 py-3 font-medium text-ink-800 dark:text-ink-100">
                              {item.email}
                            </td>
                            <td className="px-3 py-3">
                              <Badge
                                tone={
                                  item.role === 'government'
                                    ? 'bg-brand-50 text-brand-700 ring-brand-200 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30'
                                    : undefined
                                }
                              >
                                {item.role === 'government' ? 'Government' : 'Public'}
                              </Badge>
                            </td>
                            <td className="px-3 py-3 text-xs text-ink-500 dark:text-ink-400">
                              {[item.district, item.state].filter(Boolean).join(', ') || '—'}
                            </td>
                            <td className="px-3 py-3 text-right">
                              {item.role === 'government' ? (
                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                  Always allowed
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => togglePermission(item)}
                                  disabled={permissionBusy === item.id}
                                  className={`inline-flex h-7 w-12 items-center rounded-full p-0.5 transition ${
                                    item.canManageSources ? 'bg-brand-600' : 'bg-ink-300 dark:bg-ink-700'
                                  }`}
                                  role="switch"
                                  aria-checked={item.canManageSources}
                                  aria-label={`Toggle source management for ${item.email}`}
                                >
                                  <span
                                    className={`h-6 w-6 rounded-full bg-white shadow transition ${
                                      item.canManageSources ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <EmptyState title="No users found" description="Registered users will appear here." />
                )}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <RegionCard key={`${user.id}-${user.district}`} user={user} stateOptions={stateOptions} />

            <div className="rounded-xl border border-ink-200 bg-white p-4 dark:border-ink-800 dark:bg-ink-900">
              <h3 className="text-sm font-semibold text-ink-800 dark:text-ink-100">Source breakdown</h3>
              <ul className="mt-3 space-y-2">
                {Object.entries(stats?.byType || {}).map(([type, count]) => {
                  const total = stats?.total || 1;
                  return (
                    <li key={type}>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium capitalize text-ink-600 dark:text-ink-300">{type}</span>
                        <span className="text-ink-400">{count}</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-800">
                        <div
                          className="h-full rounded-full bg-brand-500"
                          style={{ width: `${Math.round((count / total) * 100)}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
                {!Object.keys(stats?.byType || {}).length && (
                  <li className="text-xs text-ink-400">No data yet.</li>
                )}
              </ul>
            </div>
          </aside>
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
