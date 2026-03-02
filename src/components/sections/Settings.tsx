export const Settings = () => (
  <section className="flex min-h-screen flex-col justify-center px-10 py-16">
    <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--sea-ink-soft)] uppercase">
      Settings
    </p>
    <h2 className="mb-4 text-3xl font-bold text-[var(--sea-ink)]">Settings Section</h2>
    <p className="max-w-prose text-[var(--sea-ink-soft)]">
      <code>getSectionId("typo")</code> is a compile error — TypeScript infers the valid keys
      directly from the component map. No separate <code>as const</code> array needed.
    </p>
  </section>
)
