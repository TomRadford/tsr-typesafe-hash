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
<Link to="/dashboard" hash="dashboard-analytics">
  View analytics
</Link>
```

This works, but the hash is an unconstrained `string`. If you rename a section, the link silently breaks — TypeScript has nothing to check it against.

---

## The solution

`createSections` is a small factory that takes a record of section components and derives everything else from it:

```tsx
// src/routes/index.tsx
export const { keys, getSectionId, SectionList } = createSections("dashboard", {
  overview: Overview,
  analytics: Analytics,
  settings: Settings,
});
```

This gives you:

|                | Type                                                       | Description                                       |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| `keys`         | `["overview", "analytics", "settings"]`                    | Tuple of section keys, usable in `z.enum()`       |
| `getSectionId` | `(key: "overview" \| "analytics" \| "settings") => string` | Type-safe ID generator                            |
| `SectionList`  | `React.ComponentType`                                      | Renders all sections with correct `id` attributes |

### On the same route

```tsx
// Sidebar nav — keys and IDs derived from the same map
{
  keys.map((key) => (
    <Link to="." hash={getSectionId(key)}>
      {key}
    </Link>
  ));
}

// Sections — IDs always match the hash above
<SectionList />;
```

### From another route

```tsx
// src/routes/summary.tsx
import { getSectionId, keys } from ".";

// TypeScript errors if "typo" is not a valid section key
<Link to="/" hash={getSectionId("analytics")}>
  View analytics →
</Link>;
```

If you rename or remove a section from the `createSections` call, every `getSectionId` call site that references the old key becomes a compile error.

---
