import { useState } from 'react';
import { FiMapPin, FiActivity, FiInfo, FiSave, FiCrosshair, FiCpu } from 'react-icons/fi';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Checkbox, Field, Input, Select, Textarea } from '../ui/Field';
import LocationPicker from '../map/LocationPicker';
import { CONDITIONS, EMPTY_SOURCE, QUALITY_FIELDS, SOURCE_TYPES } from '../../constants';
import { formatNumber, formatVolume, toApiPayload, toFormValues } from '../../lib/source';
import { createSource, updateSource } from '../../api/sources';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const SectionTitle = ({ icon: Icon, title, hint }) => (
  <div className="mb-3 flex items-center justify-between gap-3 border-b border-ink-100 pb-2 dark:border-ink-800">
    <h3 className="flex items-center gap-2 text-sm font-semibold text-ink-800 dark:text-ink-100">
      <Icon size={15} className="text-brand-600" />
      {title}
    </h3>
    {hint && <span className="text-[11px] text-ink-400">{hint}</span>}
  </div>
);

export default function SourceFormModal({ open, onClose, source, onSaved }) {
  const { token } = useAuth();
  const toast = useToast();

  const [values, setValues] = useState(() =>
    source ? toFormValues(source) : { ...EMPTY_SOURCE }
  );
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [locating, setLocating] = useState(false);

  const setField = (key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValues((current) => ({
          ...current,
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
        }));
        setLocating(false);
        toast.success('Coordinates captured from your device.');
      },
      () => {
        setLocating(false);
        toast.error('Could not access your location. Allow location access and try again.');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!values.name.trim()) return setError('Name is required.');
    const lat = Number(values.latitude);
    const lng = Number(values.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return setError('Pick the source location on the map or enter valid coordinates.');
    }
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) {
      return setError('Coordinates are out of range.');
    }

    setSaving(true);
    try {
      const payload = toApiPayload(values);
      const saved = source
        ? await updateSource(token, source.id, payload)
        : await createSource(token, payload);
      toast.success(source ? 'Water source updated.' : 'Water source added to the registry.');
      onSaved?.(saved);
      onClose();
    } catch (err) {
      setError(err.message || 'Could not save this source.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={source ? `Edit — ${source.name}` : 'Add a water source'}
      description="Document the location, water quality and access details for this source."
      size="xl"
      closeOnBackdrop={false}
      footer={
        <>
          <Button variant="outline" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="source-form"
            loading={saving}
            icon={<FiSave size={15} />}
          >
            {source ? 'Save changes' : 'Add source'}
          </Button>
        </>
      }
    >
      <form id="source-form" onSubmit={handleSubmit} className="space-y-6" noValidate>
        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </p>
        )}

        <section>
          <SectionTitle icon={FiInfo} title="Basic information" hint="* required" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Source name" required htmlFor="form-name">
              <Input
                id="form-name"
                value={values.name}
                onChange={(event) => setField('name', event.target.value)}
                placeholder="e.g. Unchar Waterfall (Upper Point)"
                required
              />
            </Field>

            <Field label="Resource type" required htmlFor="form-type">
              <Select
                id="form-type"
                value={values.sourceType}
                onChange={(event) => setField('sourceType', event.target.value)}
              >
                {SOURCE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Village" htmlFor="form-village">
              <Input
                id="form-village"
                value={values.village}
                onChange={(event) => setField('village', event.target.value)}
                placeholder="e.g. Unchar"
              />
            </Field>

            <Field label="District" htmlFor="form-district">
              <Input
                id="form-district"
                value={values.district}
                onChange={(event) => setField('district', event.target.value)}
                placeholder="e.g. Pauri Garhwal"
              />
            </Field>

            <Field label="State / UT" htmlFor="form-state">
              <Input
                id="form-state"
                value={values.state}
                onChange={(event) => setField('state', event.target.value)}
                placeholder="e.g. Uttarakhand"
              />
            </Field>

            <Field label="Duration" htmlFor="form-duration" hint="Perennial / seasonal">
              <Input
                id="form-duration"
                value={values.duration}
                onChange={(event) => setField('duration', event.target.value)}
                placeholder="e.g. Perennial or Oct – Mar"
              />
            </Field>
          </div>
        </section>

        <section>
          <SectionTitle icon={FiMapPin} title="Coordinates" hint="Click the map to set the pin" />
          <div className="mb-3 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Field label="Latitude" required htmlFor="form-lat">
              <Input
                id="form-lat"
                type="number"
                step="0.000001"
                value={values.latitude}
                onChange={(event) => setField('latitude', event.target.value)}
                placeholder="30.176563"
              />
            </Field>
            <Field label="Longitude" required htmlFor="form-lng">
              <Input
                id="form-lng"
                type="number"
                step="0.000001"
                value={values.longitude}
                onChange={(event) => setField('longitude', event.target.value)}
                placeholder="78.690818"
              />
            </Field>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={handleLocate}
                loading={locating}
                icon={<FiCrosshair size={15} />}
                className="w-full sm:w-auto"
              >
                Locate
              </Button>
            </div>
          </div>
          <LocationPicker
            latitude={values.latitude}
            longitude={values.longitude}
            onChange={(lat, lng) => {
              setField('latitude', lat);
              setField('longitude', lng);
            }}
          />
        </section>

        <section>
          <SectionTitle
            icon={FiActivity}
            title="Water quality"
            hint="Leave blank if not tested"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {QUALITY_FIELDS.map((field) => (
              <Field
                key={field.key}
                htmlFor={`form-${field.key}`}
                label={field.label}
                hint={field.unit || undefined}
              >
                <Input
                  id={`form-${field.key}`}
                  type="number"
                  step={field.step}
                  min="0"
                  value={values[field.key]}
                  onChange={(event) => setField(field.key, event.target.value)}
                  placeholder={field.placeholder}
                />
              </Field>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={FiInfo} title="Usage, condition & status" />
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Condition" htmlFor="form-condition">
              <Select
                id="form-condition"
                value={values.condition}
                onChange={(event) => setField('condition', event.target.value)}
              >
                {CONDITIONS.map((condition) => (
                  <option key={condition.value} value={condition.value}>
                    {condition.label}
                  </option>
                ))}
              </Select>
            </Field>

            <Field label="Users per day" htmlFor="form-users">
              <Input
                id="form-users"
                type="number"
                min="0"
                value={values.usersPerDay}
                onChange={(event) => setField('usersPerDay', event.target.value)}
                placeholder="e.g. 120"
              />
            </Field>

            <Field label="Distance from village (km)" htmlFor="form-distance">
              <Input
                id="form-distance"
                type="number"
                step="0.01"
                min="0"
                value={values.distanceFromVillage}
                onChange={(event) => setField('distanceFromVillage', event.target.value)}
                placeholder="e.g. 1.5"
              />
            </Field>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Checkbox
              label="Potable"
              description="Safe for drinking"
              checked={values.isPotable}
              onChange={(event) => setField('isPotable', event.target.checked)}
            />
            <Checkbox
              label="Seasonal"
              description="Not available year-round"
              checked={values.seasonal}
              onChange={(event) => setField('seasonal', event.target.checked)}
            />
            <Checkbox
              label="Verified"
              description="Field-checked by the team"
              checked={values.verified}
              onChange={(event) => setField('verified', event.target.checked)}
            />
          </div>
        </section>

        <section>
          <SectionTitle
            icon={FiCpu}
            title="Storage & hardware"
            hint="Volume = area × sensor height"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Storage area (m²)"
              htmlFor="form-area"
              hint="Configured by admin"
            >
              <Input
                id="form-area"
                type="number"
                min="0"
                step="0.01"
                value={values.area}
                onChange={(event) => setField('area', event.target.value)}
                placeholder="e.g. 250"
              />
            </Field>

            <Field
              label="Sensor device ID"
              htmlFor="form-device"
              hint="Must match the hardware"
            >
              <Input
                id="form-device"
                value={values.deviceId}
                onChange={(event) => setField('deviceId', event.target.value)}
                placeholder="e.g. jalsrot-sensor-01"
              />
            </Field>
          </div>

          <p className="mt-2 rounded-lg bg-ink-50 px-3 py-2 text-xs text-ink-500 dark:bg-ink-950/60 dark:text-ink-400">
            {source?.latestHeight !== null && source?.latestHeight !== undefined ? (
              <>
                Latest sensor height:{' '}
                <span className="font-semibold text-ink-700 dark:text-ink-200">
                  {formatNumber(source.latestHeight)} m
                </span>
                {Number(values.area) > 0 && (
                  <>
                    {' '}→ estimated volume:{' '}
                    <span className="font-semibold text-brand-700 dark:text-brand-300">
                      {formatVolume(Number(values.area) * Number(source.latestHeight))}
                    </span>
                  </>
                )}
              </>
            ) : (
              'Volume is filled automatically when the linked hardware sends its first height reading.'
            )}
          </p>
        </section>

        <Field label="Notes" htmlFor="form-notes">
          <Textarea
            id="form-notes"
            rows={3}
            value={values.notes}
            onChange={(event) => setField('notes', event.target.value)}
            placeholder="Access notes, observations, maintenance history…"
          />
        </Field>

      </form>
    </Modal>
  );
}
