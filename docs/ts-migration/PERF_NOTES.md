# Perf Notes - Entrypoint App (Vue CLI)

Date: 2026-02-24

## Objective
Reduce `app` entrypoint weight without functional changes, by tuning webpack chunk split in Vue CLI.

## Change applied
File: `vue.config.js`

- Added explicit `optimization.splitChunks` strategy with:
  - `default` and `defaultVendors` disabled (to avoid implicit grouping conflicts)
  - `framework` cache group (`initial`) for core UI/runtime libs
  - `vendors` and `common` cache groups on `async` chunks
  - `reuseExistingChunk: true`

No app code migration, no Vite migration.

## Build comparison (`npm run build`)

### Before
Entrypoint `app` assets:
- `css/chunk-vendors.d17b1de6.css`: 670.46 KiB
- `js/chunk-vendors.994b4671.js`: 403.30 KiB
- `css/app.74ffe729.css`: 19.82 KiB
- `js/app.2916c094.js`: 29.17 KiB

Total initial entrypoint assets (sum): **1122.75 KiB**

### After
Entrypoint `app` assets:
- `css/chunk-framework.145e593e.css`: 561.18 KiB
- `js/chunk-framework.ae983032.js`: 187.56 KiB
- `css/app.b74c496b.css`: 129.10 KiB
- `js/app.38a25cba.js`: 244.68 KiB

Total initial entrypoint assets (sum): **1122.52 KiB**

## Impact
- Entrypoint total is slightly reduced: **-0.23 KiB** (~0.02%).
- Main impact is chunk structure normalization (`framework` vs `vendors/common`) while preserving behavior.
- Existing webpack performance warnings remain (large media/static assets), unchanged by this scope-limited config work.

## Validation
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
