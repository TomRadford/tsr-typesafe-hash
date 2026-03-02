import { getOverviewSectionId, keys } from ".";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/summary")({ component: Summary });

const descriptions: Record<(typeof keys)[number], string> = {
  overview: "A high-level look at the current state of your dashboard.",
  analytics: "Detailed metrics and trends across all tracked events.",
  settings: "Configure your preferences and account options.",
};

function Summary() {
  return (
    <main className="mx-auto max-w-2xl px-8 py-16">
      <p className="mb-2 text-sm font-semibold tracking-widest text-[var(--sea-ink-soft)] uppercase">
        Summary
      </p>
      <h1 className="mb-2 text-3xl font-bold text-[var(--sea-ink)]">
        Dashboard summary
      </h1>
      <p className="mb-10 text-[var(--sea-ink-soft)]">
        A summary of each section. Each card links directly into its section on
        the dashboard — <code>getSectionId</code> is imported from the dashboard
        route, so the hash is always in sync.
      </p>

      <div className="flex flex-col gap-4">
        {keys.map((key) => (
          <div
            key={key}
            className="rounded-2xl border border-[var(--line)] bg-[var(--island-bg,black)] p-6"
          >
            <h2 className="mb-1 text-base font-semibold capitalize text-[var(--sea-ink)]">
              {key}
            </h2>
            <p className="mb-4 text-sm text-[var(--sea-ink-soft)]">
              {descriptions[key]}
            </p>
            <Link
              to="/"
              hash={getOverviewSectionId(key)}
              className="text-sm font-semibold text-[var(--lagoon-deep,#2563eb)] no-underline hover:underline"
            >
              View in dashboard →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/"
          className="text-sm text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]"
        >
          ← Back to dashboard
        </Link>
      </div>
    </main>
  );
}
