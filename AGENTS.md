# AGENTS.md

> Never rename this file. The canonical name is `AGENTS.md` (all caps).
> When you learn something new about the project — architecture decisions,
> conventions, or patterns — add it to this file upon request.

Planning poker with `TypeScript`, `Redux Toolkit`, `React Router`,
`react-intl`, `Less`, and webpack 5. Use this file as the fast path for
understanding project structure, data flow, and developer workflow.

## Overview

- Entry point is `src/index.tsx`: it mounts `App`, imports global `less`,
  enables HMR, and registers `public/sw.js` on `window.load`.
- `src/app/ui/App.tsx` builds the shell in this order: `StrictMode` →
  `ErrorBoundary` → Redux `Provider` → `HashRouter` → `LocaleProvider` →
  `Config` → `FirebaseProvider` → `Layout` → route tree.
  `ErrorBoundary` (`src/modules/common/ui/ErrorBoundary`) catches React errors
  and displays a fallback UI with error details.
- `Config` and `LocaleProvider` are bootstrap gates: both return `null` until
  async bootstrap finishes, so UI intentionally waits for config + i18n data
  before rendering.
- Routes are small and module-owned: top-level routes live in
  `src/app/lib/constants.ts`, while feature-local subroutes live in module
  constants such as `src/modules/example/lib/constants.ts`.

## Architecture notes

### State and data flow

- Redux Toolkit is the shared state boundary. `src/app/lib/reducers.ts`
  combines module reducers; add new slices there and update app store/types
  under `src/app/lib`.
- Use the typed Redux hooks from `src/app/lib/hooks.ts` (`useAppDispatch`,
  `useAppSelector`); `createAppSelector` is also available there when you need
  typed memoized selectors.
- Async work is implemented as thunks dispatched from `useEffect`. Examples:
  `actionGetConfig`, `actionExampleGetList`, `actionLocaleGetMessages` in
  `src/modules/*/lib/actions.ts`.
- Async thunks follow the same pattern: set status → call
  `api.requestLocal(...)` or `api.request(...)` → dispatch slice action →
  set status success/error.
- Request status is centralized in the `status` slice and keyed by
  `sliceAction.type` (`selectStatusItem(configActions.update.type)`,
  `selectStatusItem(exampleActions.getList.type)`). Reuse that pattern instead
  of feature-specific loading flags.
- Collection data is commonly normalized into `{data, list}`. See
  `src/modules/example/lib/reducers.ts` using `getNormalize()` and selectors
  rebuilding arrays with `getList()` from `src/modules/common/lib/selectors.ts`.

### Config, API, and external integrations

- `src/modules/common/lib/api.ts` is the only fetch wrapper. `Api.host` is
  mutable global state populated by `Config` from `/local/api/v1/config.json`;
  normal remote requests should go through `api.request()`. `api.host` is set
  as a side effect of `actionGetConfig` — never call `api.request()` before
  `Config` finishes loading or the request will go to an empty host. This is
  enforced architecturally: `Config` blocks rendering until `Status.success`,
  so child components cannot call `api.request()` prematurely.
- Mock/bootstrap data is served from `public/local/api/v1/*.json` and fetched
  through `api.requestLocal(...)`, which prefixes `/local`.
- Locale state is split across Redux + `localStorage`: `useLocaleSetCurrent()`
  writes `currentLocale`, and `useLocaleCurrent()` falls back to storage then
  `defaultLocale` (`ru`).
- Text should go through `src/modules/locale/ui/Message.tsx` or
  `useGetMessage()` from `src/modules/locale/lib/useGetMessage.ts`, with keys
  stored in locale JSON files like `public/local/api/v1/locale-en.json`.
- SVG icons are loaded by name (`<SvgIcon name="logo" />`) from
  `src/icons/*.svg`; `src/modules/common/lib/iconMap.ts` builds the allowed
  name → `viewBox` map with `require.context(...)`, and missing `viewBox` values
  only surface as dev warnings. Webpack bundles the sprite into `sprite.svg` via
  `config/svg.js`.

### Firebase and error fallbacks

- Firebase data (`FirebaseApp`, `Auth`, `User`, `Firestore`, `Database`) lives
  exclusively in React Context — never in Redux. Providers are chained:
  `FirebaseAppProvider` → `AuthProvider` → `AnonymouslyProvider` →
  `FirestoreProvider` → `DatabaseProvider`.
- Each Firebase provider returns `null` while initializing and renders children
  only after the value is ready.
- Provider layer determines which error component to use:
  - Inside `FirebaseProvider` (and any component below `Config` in the tree):
    use `EmptyKey` with locale keys — translations are already loaded.
  - Inside `LocaleProvider` itself (before translations are available):
    use `Empty` with hardcoded Russian text, since `IntlProvider` is not yet
    mounted.

### Codebase conventions

- Imports use the `src` alias (`import {App} from 'src/app/ui/App'`),
  wired through `tsconfig.json#compilerOptions.paths` and webpack
  `resolve.alias.src` in `config/base.js`.
- Source code is split by responsibility: `ui/` holds React components
  (`src/app/ui/App.tsx`, `src/modules/example/ui/Example.tsx`), while `lib/`
  holds state, selectors, constants, and helpers (`src/app/lib/store.ts`,
  `src/modules/example/lib/actions.ts`). Some shell-only modules such as
  `src/modules/home` and `src/modules/layout` are `ui/`-only.
- Component styles live beside components and are imported for side effects (
  `import './Header.less'`). Shared global styles are composed once in
  `src/styles/index.less`.
- Existing UI naming is BEM-like (`Layout__Header`, `ExampleList__Cell`) rather
  than CSS modules, even though `types/index.d.ts` declares `*.less` modules.
- Mutating a local accumulator inside `reduce` is intentional and preferred over
  immutable spread (`{ ...acc, key: value }`) when the accumulator does not
  escape the `reduce` call. Immutable spread in `reduce` creates a new object on
  every iteration and wastes memory. Apply immutability where it matters: Redux
  reducers, shared state, and objects that outlive their creation scope.
- `typeof genericFunc<Type>` is valid TypeScript 5+ syntax for applying type
  parameters to a `typeof` expression of a generic function. Use it to extract
  inferred types from function signatures, e.g.
  `Parameters<typeof generatePath<'/:exampleId'>>[1]` → `{ exampleId: string }`.
- Curried generic functions preserve literal types across call levels:
  `getFullPath(root)(path)` with `as const` return type infers
  `` `${typeof Root}${typeof Path}` `` as a compile-time literal type, enabling
  accurate type inference for route params in downstream consumers.
- Many components intentionally render `null` until status becomes
  `Status.success`; preserve that behavior when extending bootstrapping flows.
- `src/modules/common/ui/Scroll.tsx` is part of the layout shell;
  changes there affect most pages.
- `src/modules/common/ui/` provides shared UI utilities: `If` (conditional
  rendering), `Empty` (empty state display), `Loader` (loading indicator),
  `Table` (table layout), and `SvgIcon` (sprite-loaded icons). Reuse these
  instead of creating custom equivalents.

## Developer workflow

- Install dependencies first: `npm ci`.
- Required toolchain is `Node.js >= 22.23.0` and `npm >= 10.9.8`
  (`package.json#engines`).
- Verified production build: `npm run build`. It writes the bundle to `www/` and
  copies everything from `public/` there via `CopyWebpackPlugin`.
- Dev server command is `npm run dev`; `config/base.js` binds it to
  `0.0.0.0:8000` with `historyApiFallback: true`.
- Production webpack serve command is `npm run start`.
- There are no test files or test scripts in this repo right now; validation is
  mainly `npm run type`, linting, and build-based checks.
- Run `npm run type` when editing `.ts`/`.tsx`; webpack transpiles through
  `babel-loader` in `config/script.js`, so `npm run build` does not replace
  TypeScript checking.
- `npm run lint` runs ESLint 9 with the flat config in `eslint.config.mjs` and
  covers `.js,.jsx,.ts,.tsx` under `src`.
- `npm run style` is available and uses the root `.stylelintrc` with
  `stylelint-config-standard-less`.
- `npm run format` / `npm run format:fix` run Prettier checks and fixes
  (see `package.json#scripts`); prefer `format:fix` when you want to rewrite
  files.
- `package.json#overrides` contains security-driven transitive pins; keep them
  unless you intentionally rework the affected toolchain.

## Adding new modules

- Mirror the existing module split from `README.md`: `ui/` plus `lib/` (
  actions/reducers/selectors/types/constants), and optional `api/`.
- Some modules are UI-only shells (e.g., `src/modules/home`,
  `src/modules/layout`, `src/modules/form`, `src/modules/control`) with just a
  `ui/` folder and no `lib/`
  directory. Use this pattern for layout components, form controls, or pure UI
  shells that don't manage Redux state or data fetching.
- `src/modules/example` is the reference module for new data-driven features;
  use it as the template for structure, routing, async hooks, reducers,
  selectors, and normalized list state.
- Start from `src/modules/example/ui/Example.tsx` for route composition,
  `src/modules/example/lib/actions.ts` for async hook shape,
  `src/modules/example/lib/reducers.ts` for normalized slice structure, and
  `src/modules/example/lib/selectors.ts` for selector patterns.
- Put route constants in the module, async hooks in `lib/actions.ts`, state
  shape in `lib/reducers.ts`, and selectors in `lib/selectors.ts`.
- If the module loads remote/mock data, wire status updates through
  `getActionSetStatus(action.type)` and register the reducer in
  `src/app/lib/reducers.ts`.
- After adding a new slice, check whether app-level store/types or typed hooks
  also need updates under `src/app/lib`.
