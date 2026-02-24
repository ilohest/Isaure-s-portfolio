# Performance Build Optimization Report (2026-02-24)

## Validation
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS

## Warnings before/after
- Before: 2 warning blocks (asset size + entrypoint size).
- After: 1 warning blocks (asset size only).

## Top 10 heavy build assets (before)
| Asset | Size |
|---|---:|
| media/videos/mark-conlan-home.mov | 14.9 MiB |
| img/blc6.eb20ed1d.png | 7.43 MiB |
| img/mockup2-bodamp.1fe3cc44.png | 7.13 MiB |
| media/video-boda-N&M.c936edd8.mp4 | 6.57 MiB |
| media/videos/video-boda-N&M.mp4 | 6.57 MiB |
| media/video-didacmania.e7e159c3.mp4 | 5.91 MiB |
| media/videos/video-didacmania.mp4 | 5.91 MiB |
| media/video-creyda-short.35eedce0.mp4 | 5.65 MiB |
| media/videos/video-creyda-short.mp4 | 5.65 MiB |
| img/blc11.07e3360e.png | 5.03 MiB |

## Top 10 heavy build assets (after)
| Asset | Size |
|---|---:|
| img/mockup2-bodamp.63cbe056.png | 7.12 MiB |
| img/blc6.0d02c61b.png | 6.61 MiB |
| media/videos/mark-conlan-home.mov | 5.21 MiB |
| img/blc11.97eb9aad.png | 4.75 MiB |
| img/blc4.b87149da.png | 3.52 MiB |
| img/canpruna-desktop1.3efd100f.png | 3.03 MiB |
| assets/img/branding/Flou/flou-10-1920.png | 2.91 MiB |
| media/video-boda-N&M.255620a7.mp4 | 2.8 MiB |
| media/videos/video-boda-N&M.mp4 | 2.8 MiB |
| media/video-creyda-short.5a06b817.mp4 | 2.79 MiB |

## Top 10 optimized source assets (before/after/gain)
| File | Before | After | Gain |
|---|---:|---:|---:|
| public/media/videos/mark-conlan-home.mov | 14.94 MiB | 5.21 MiB | 65.14% |
| src/assets/img/blc6.png | 7.43 MiB | 6.61 MiB | 11.00% |
| src/assets/img/mockup2-bodamp.png | 7.13 MiB | 7.12 MiB | 0.04% |
| public/media/videos/video-boda-N&M.mp4 | 6.57 MiB | 2.80 MiB | 57.29% |
| public/media/videos/video-didacmania.mp4 | 5.91 MiB | 2.62 MiB | 55.65% |
| public/media/videos/video-creyda-short.mp4 | 5.65 MiB | 2.79 MiB | 50.74% |
| src/assets/img/blc11.png | 5.03 MiB | 4.75 MiB | 5.53% |
| src/assets/img/blc4.png | 3.99 MiB | 3.52 MiB | 11.81% |
| public/media/videos/video-cledore.mp4 | 3.59 MiB | 1.95 MiB | 45.59% |
| public/assets/img/Pages/celebrate.png | 3.16 MiB | 2.79 MiB | 11.84% |

## Chunk impact (main bundle)
| Chunk | Before | After |
|---|---:|---:|
| dist/js/home.*.js | 1425.12 KiB | 1425.12 KiB |
| dist/js/chunk-vendors.*.js | 446.35 KiB | 235.07 KiB |
| dist/js/chunk-framework.*.js | 187.56 KiB | 147.94 KiB |
| dist/js/chunk-ui.*.js | n/a | 164.67 KiB |
| dist/css/chunk-vendors.*.css | n/a | 109.28 KiB |
| dist/css/chunk-ui.*.css | n/a | 561.18 KiB |

## Media optimization totals
- Images recompressed: 109 files, 119.70 MiB -> 76.25 MiB (gain 43.45 MiB, 36.30%).
- Videos re-encoded: 19 files, 65.52 MiB -> 22.96 MiB (gain 42.56 MiB, 64.96%).

## Remaining risks
- Some individual assets still exceed 1 MiB (mainly very large hero/media files); additional reductions are possible but may impact perceived visual quality.
- `dist/js/home.*.js` remains large because the Home component itself is very heavy (large inline markup/content); deeper reduction needs structural component refactors.
