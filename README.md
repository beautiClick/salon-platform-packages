# salon-platform-packages

Shared, versioned packages used by every Salon micro-frontend repo.

| Package               | Purpose                                               |
| --------------------- | ----------------------------------------------------- |
| `@beauticlick/config` | Shared TypeScript, ESLint and Prettier presets        |
| `@beauticlick/tokens` | Salon-type contract (design tokens arrive in Phase 2) |

## Requirements

- Node.js 24 (see `.nvmrc`), pnpm 12 (pinned in `package.json` via `packageManager`)

## Everyday commands

```
pnpm install        # install and link workspace packages
pnpm format         # fix formatting
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit in every package
pnpm build          # build every package
pnpm changeset      # describe a change (required for anything that should be released)
```

## Releasing

1. Make your change and run `pnpm changeset`. Pick the packages and the bump
   (patch = fix, minor = backwards-compatible feature, major = breaking change).
2. Merge to `main`. The Release workflow opens a "Version Packages" PR.
3. Merge that PR. The workflow publishes to GitHub Packages.

Decisions and their reasons are recorded in `docs/decisions.md`.
