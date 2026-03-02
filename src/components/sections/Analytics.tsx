export const Analytics = () => (
  <section className="flex min-h-screen flex-col justify-center border-b border-[var(--line)] px-10 py-16">
    <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--sea-ink-soft)] uppercase">
      Analytics
    </p>
    <h2 className="mb-4 text-3xl font-bold text-[var(--sea-ink)]">Analytics Section</h2>
    <p className="max-w-prose text-[var(--sea-ink-soft)]">
      Adding a new section only requires one line in the <code>createSections</code> call. The
      nav, IDs, and rendered list update automatically — no separate arrays to keep in sync.
    </p>
  </section>
)
