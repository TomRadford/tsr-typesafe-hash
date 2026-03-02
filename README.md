# typesafe-hash

A minimal reproduction demonstrating type-safe hash navigation in TanStack Router using a `createSections` factory.

```bash
pnpm install
pnpm dev  # http://localhost:3002
```

---

## The problem

When building scrollable pages with multiple named sections, a common pattern is to navigate directly to a section using a URL hash:

```tsx
<Link to="/dashboard" hash="dashboard-analytics">View analytics</Link>
```

This works, but the hash is an unconstrained `string`. If you rename a section, the link silently breaks — TypeScript has nothing to check it against. You also end up maintaining multiple sources of truth: the element `id`, a separate `as const` array for Zod validation, and the hash strings at every call site.

The same problem appears across routes. When a summary page links into a specific section on a dashboard page, the hash string is duplicated in both files with no shared reference.

---

## The solution

`createSections` is a small factory that takes a record of section components and derives everything else from it:

```tsx
// src/routes/index.tsx
export const { keys, getSectionId, SectionList } = createSections('dashboard', {
  overview: Overview,
  analytics: Analytics,
  settings: Settings,
})
```

This gives you:

| | Type | Description |
|---|---|---|
| `keys` | `["overview", "analytics", "settings"]` | Tuple of section keys, usable in `z.enum()` |
| `getSectionId` | `(key: "overview" \| "analytics" \| "settings") => string` | Type-safe ID generator |
| `SectionList` | `React.ComponentType` | Renders all sections with correct `id` attributes |

### On the same route

```tsx
// Sidebar nav — keys and IDs derived from the same map
{keys.map(key => (
  <Link to="." hash={getSectionId(key)}>{key}</Link>
))}

// Sections — IDs always match the hash above
<SectionList />
```

### From another route

```tsx
// src/routes/summary.tsx
import { getSectionId, keys } from '.'

// TypeScript errors if "typo" is not a valid section key
<Link to="/" hash={getSectionId("analytics")}>View analytics →</Link>
```

If you rename or remove a section from the `createSections` call, every `getSectionId` call site that references the old key becomes a compile error.

---

## Implementation

```tsx
// src/utils/createSections.tsx
type SectionMap = Record<string, React.ComponentType>

export function createSections<T extends SectionMap>(prefix: string, components: T) {
  const keys = Object.keys(components) as [keyof T & string, ...(keyof T & string)[]]

  const getSectionId = (key: keyof T & string) => `${prefix}-${key}`

  function SectionList() {
    return keys.map(key => {
      const Component: React.ComponentType = components[key]
      return (
        <div key={key} id={getSectionId(key)}>
          <Component />
        </div>
      )
    })
  }

  return { keys, getSectionId, SectionList }
}
```

The tuple cast on `keys` (`[T, ...T[]]`) satisfies `z.enum()`'s requirement for a non-empty array while preserving the string literal union for `getSectionId`.

TanStack Router scrolls to the hash element automatically after navigation — no `useEffect`, no `document.getElementById`, no scroll timing issues.

---

## File structure

```
src/
  components/sections/
    Overview.tsx       # Section components
    Analytics.tsx
    Settings.tsx
  utils/
    createSections.tsx # Factory
  routes/
    index.tsx          # Dashboard — exports getSectionId for use elsewhere
    summary.tsx        # Cross-route example — imports getSectionId from index
```
