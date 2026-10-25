# Decision log

Each entry: what we decided, why, and what we gave up.

## Verified tool versions (checked 2026-10-25)

| Tool              | Pinned                           | Note                                                                               |
| ----------------- | -------------------------------- | ---------------------------------------------------------------------------------- |
| Node.js           | 24 (`.nvmrc`), engines `>=22.13` | Node 24 is LTS to April 2028. Node 26 becomes LTS on 2026-10-28; revisit then.     |
| pnpm              | 12.15.0                          | Pinned through `packageManager` so local and CI match.                             |
| TypeScript        | 6.0.3                            | **Not 7.** typescript-eslint 8.72 supports TypeScript `<6.1`.                      |
| ESLint            | 10.13.0                          | Flat config only.                                                                  |
| typescript-eslint | 8.72.0                           |                                                                                    |
| Prettier          | 3.9.10                           |                                                                                    |
| Changesets CLI    | 3.0.3                            | Action `changesets/action@v2.1.2` uses `publish-script` / `version-script` inputs. |

## ADR-001: Multi-Zones, not Module Federation

Module Federation's Next.js plugin does not support the App Router and its Next.js support is ending.
Multi-Zones is officially documented and works across repos. Cost: route-level composition only,
and hard navigation between zones, so zones follow how people navigate.

## ADR-002: Multi-repo apps, one repo for shared libraries

Apps are separate repos (independent deploys). The libraries live together in this repo so a related
change in tokens and UI can release together. Each package is still versioned and published separately.

## ADR-003: GitHub Packages, scope `@beauticlick`

No extra infrastructure and permissions follow the repo. The scope must match the owner and be lowercase.
Cost: consumers need a token even to install private packages.

## ADR-010: GitHub organization `beauticlick`, not a personal account

All repos and packages live under the organization instead of a personal account.
Why: the scope belongs to the product, so it survives people joining or leaving; access is managed with teams
instead of per-repo invites; org-level settings (Actions permissions, package visibility) apply to every repo.
Cost: the organization's plan limits and its Actions and package settings must be checked before the first release.
The package scope must equal the organization name, so renaming the organization later means renaming every package.

## ADR-004: Tokens never committed

`.npmrc` in the repo holds only the scope-to-registry mapping. Tokens live in `~/.npmrc` locally and are
injected by `actions/setup-node` in CI.

## ADR-005: TypeScript module mode NodeNext

Libraries should compile the way the strictest consumer reads them. NodeNext forces correct ESM output
(explicit `.js` extensions in relative imports) so a package works under Node and under bundlers.
Bundler mode would be more forgiving but can emit packages that fail when Next.js loads them on the server.
We use plain `tsc` for now and add a bundler only when a real need appears (for example SCSS or JSX in `@beauticlick/ui`).

## ADR-006: peerDependencies for singletons

`react`, `next` and `@mui/material` will be peer dependencies of UI packages so only one copy loads.
Two copies of React or Emotion break context and styling.

## ADR-007: Semver with Changesets

Changes are described explicitly in reviewable files, so version bumps are deliberate, not guessed from commit messages.

## ADR-008: Presets named by salon type, not color

`women`, `men`, `unisex` are identities. Colors are values and can change later without the names becoming wrong.

## ADR-009: Tenancy, identity and permissions

Recorded in the master prompt document: shared tables with `tenant_id` from the session, staff-only login for the
salon portal, role defaults plus per-user overrides, admin-locked permissions, identical 404 for cross-tenant or
missing records, and a separate booking portal later.
