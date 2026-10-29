import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiMapPin, FiSend, FiInfo, FiArrowRight } from 'react-icons/fi';
import PageHeader from '../components/layout/PageHeader';
import Button from '../components/ui/Button';
import { Field, Input, Textarea } from '../components/ui/Field';
import { useToast } from '../context/ToastContext';
import { SITE } from '../constants';

const CONTACT_CARDS = [
  {
    icon: FiMail,
    title: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: FiMapPin,
    title: 'Institution',
    value: SITE.institution,
    href: 'https://www.openstreetmap.org/',
  },
];

export default function ContactPage() {
  const toast = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' });

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      `[JalSrot] ${form.subject}`
    )}&body=${encodeURIComponent(body)}`;
    toast.success('Opening your email app with the message ready to send.');
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact & Support"
        title="Get in touch"
        description="Questions about the data, a source to report, or a collaboration idea — we'd like to hear from you."
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <div className="space-y-4">
            {CONTACT_CARDS.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group flex items-start gap-4 rounded-2xl border border-ink-200/90 bg-white p-5 shadow-xs transition hover:border-brand-300 hover:shadow-soft dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/40"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-200/70 transition group-hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-300 dark:ring-brand-500/30 dark:group-hover:bg-brand-500/25">
                  <card.icon size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {card.title}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-ink-900 group-hover:text-brand-700 dark:text-ink-100 dark:group-hover:text-brand-300">
                    {card.value}
                  </p>
                </div>
              </a>
            ))}

            <div className="rounded-2xl border border-brand-200/80 bg-gradient-to-br from-brand-500/10 via-brand-50/60 to-white p-5 sm:p-6 shadow-xs dark:border-brand-500/30 dark:from-brand-500/15 dark:via-ink-900 dark:to-ink-900">
              <h3 className="flex items-center gap-2 font-display text-base font-bold text-brand-900 dark:text-brand-200">
                <FiInfo size={17} className="text-brand-600 dark:text-brand-400" /> Spotted incorrect or missing data?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                If a water source is dried up, seasonal, missing from the map, or has inaccurate field
                details, let us know with its approximate location or name so the research team can verify it.
              </p>
              <Link
                to="/sources"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-semibold text-brand-700 shadow-2xs ring-1 ring-inset ring-brand-200/70 transition hover:bg-brand-50 hover:text-brand-800 dark:bg-ink-900 dark:text-brand-300 dark:ring-brand-500/30 dark:hover:bg-ink-800"
              >
                Browse Water Sources <FiArrowRight size={13} />
              </Link>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-ink-200/90 bg-white p-6 sm:p-8 shadow-soft dark:border-ink-800 dark:bg-ink-900"
          >
            <div className="border-b border-ink-100 pb-4 dark:border-ink-800">
              <h2 className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-white">
                Send a Message
              </h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                Inquiries, field observations, or collaboration proposals — we usually respond within two working days.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your Name" required htmlFor="contact-name">
                <Input
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  placeholder="Full name"
                />
              </Field>
              <Field label="Email Address" required htmlFor="contact-email">
                <Input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  placeholder="you@example.com"
                />
              </Field>
            </div>

            <Field label="Subject" className="mt-4" htmlFor="contact-subject">
              <Input
                id="contact-subject"
                value={form.subject}
                onChange={(event) => update('subject', event.target.value)}
              />
            </Field>

            <Field label="Message" className="mt-4" required htmlFor="contact-message">
              <Textarea
                id="contact-message"
                rows={6}
                required
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                placeholder="Tell us about the water source, question, or research collaboration…"
              />
            </Field>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
              <p className="text-xs text-ink-400">Opens in your default email client.</p>
              <Button type="submit" size="md" className="px-6" icon={<FiSend size={14} />}>
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
