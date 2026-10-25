import { FiRotateCcw, FiSearch } from 'react-icons/fi';
import { Field, Input, Select, Checkbox } from '../ui/Field';
import { CONDITIONS, SOURCE_TYPES } from '../../constants';
import { uniqueValues } from '../../lib/source';

const ALL = '';

export default function SourceFilters({
  filters,
  onChange,
  onReset,
  sources = [],
  variant = 'inline',
  showCondition = true,
  showPotable = true,
  className = '',
}) {
  const states = uniqueValues(sources, 'state');
  const districts = uniqueValues(
    filters.state ? sources.filter((source) => source.state === filters.state) : sources,
    'district'
  );

  const stacked = variant === 'stacked';
  const wrapper = stacked ? 'space-y-3.5' : 'grid gap-3 md:grid-cols-2 xl:grid-cols-4';

  const update = (key, value) => {
    const next = { [key]: value };
    if (key === 'state') next.district = '';
    onChange(next);
  };

  return (
    <div className={`${wrapper} ${className}`}>
      <Field
        label="Search"
        className={stacked ? '' : 'md:col-span-2'}
        htmlFor="filter-search"
      >
        <div className="relative">
          <FiSearch
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            size={15}
          />
          <Input
            id="filter-search"
            value={filters.search}
            onChange={(event) => update('search', event.target.value)}
            placeholder="Name, village or district"
            className="pl-9"
          />
        </div>
      </Field>

      <Field label="State / UT" htmlFor="filter-state">
        <Select
          id="filter-state"
          value={filters.state}
          onChange={(event) => update('state', event.target.value)}
        >
          <option value={ALL}>All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="District" htmlFor="filter-district">
        <Select
          id="filter-district"
          value={filters.district}
          onChange={(event) => update('district', event.target.value)}
        >
          <option value={ALL}>All Districts</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Resource type" htmlFor="filter-type">
        <Select
          id="filter-type"
          value={filters.type}
          onChange={(event) => update('type', event.target.value)}
        >
          <option value={ALL}>All Types</option>
          {SOURCE_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </Field>

      {showCondition && (
        <Field label="Condition" htmlFor="filter-condition">
          <Select
            id="filter-condition"
            value={filters.condition}
            onChange={(event) => update('condition', event.target.value)}
          >
            <option value={ALL}>Any condition</option>
            {CONDITIONS.map((condition) => (
              <option key={condition.value} value={condition.value}>
                {condition.label}
              </option>
            ))}
          </Select>
        </Field>
      )}

      <div className={`flex flex-wrap items-end gap-2 ${stacked ? '' : 'md:col-span-2 xl:col-span-1'}`}>
        {showPotable && (
          <Checkbox
            label="Potable only"
            checked={filters.potableOnly}
            onChange={(event) => update('potableOnly', event.target.checked)}
            className="min-w-40 flex-1 py-2"
          />
        )}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex h-10 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-ink-500 transition hover:bg-ink-100 hover:text-ink-800 dark:text-ink-400 dark:hover:bg-ink-800 dark:hover:text-white"
        >
          <FiRotateCcw size={13} /> Reset
        </button>
      </div>
    </div>
  );
}
