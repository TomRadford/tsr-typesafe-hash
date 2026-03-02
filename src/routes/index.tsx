import { Analytics } from "../components/sections/Analytics";
import { Overview } from "../components/sections/Overview";
import { Settings } from "../components/sections/Settings";
import { createSections } from "../utils/createSections";
import { createFileRoute, Link } from "@tanstack/react-router";

export const {
  keys,
  getSectionId: getOverviewSectionId,
  SectionList,
} = createSections("dashboard", {
  overview: Overview,
  analytics: Analytics,
  settings: Settings,
});

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex">
      {/* Sticky sidebar — hash links handled natively by TanStack Router, no useEffect */}
      <nav className="sticky top-0 flex h-screen w-56 flex-col gap-1 border-r border-[var(--line)] px-4 py-8">
        <p className="mb-3 px-2 text-xs font-semibold tracking-widest text-[var(--sea-ink-soft)] uppercase">
          Sections
        </p>
        {keys.map((key) => (
          <Link
            key={key}
            to="."
            hash={getOverviewSectionId(key)}
            className="rounded-lg px-3 py-2 text-sm font-medium capitalize text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            {key}
          </Link>
        ))}
        <div className="mt-auto border-t border-[var(--line)] pt-4">
          <Link
            to="/summary"
            className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            View summary →
          </Link>
        </div>
      </nav>

      <main className="flex-1">
        <SectionList />
      </main>
    </div>
  );
}
