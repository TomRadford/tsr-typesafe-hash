export const Overview = () => (
  <section className="flex min-h-screen flex-col justify-center border-b border-[var(--line)] px-10 py-16">
    <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--sea-ink-soft)] uppercase">
      Overview
    </p>
    <h2 className="mb-4 text-3xl font-bold text-[var(--sea-ink)]">Overview Section</h2>
    <p className="max-w-prose text-[var(--sea-ink-soft)]">
      This section has a stable, type-safe ID derived from its key in the{' '}
      <code>createSections</code> map. Navigate here with{' '}
      <code>hash={`{getSectionId("overview")}`}</code> — TanStack Router handles the scroll
      natively.
    </p>
  </section>
)
