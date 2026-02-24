# Media Architecture Plan

## Target structure

```text
src/assets/
  media-src/                     # masters only (never imported in UI)
    pages/
      home/
      contact/
    projects/
      boda-nm/
      didacmania/
      creyda/
      cledore/
      gradient/
      tdc/
      lpsu/
      canpruna/
      blc/
    branding/
      flou/
      elinor/
      bellelachaise/
      canpruna/

public/assets/media/
  common/
    logos/
    icons/
  pages/
    home/images/
    contact/images/
  projects/
    <slug>/images/
    <slug>/videos/
  branding/
    <slug>/images/

public/media/videos/             # legacy compatibility (temporary)
```

## Naming convention

`<domain>-<slug>-<role>-<variant>-<width>.<ext>`

Examples:
- `project-boda-nm-hero-desktop-1920.avif`
- `project-boda-nm-card-thumb-640.webp`
- `project-boda-nm-demo-loop-1080.mp4`
- `page-home-hero-bg-1920.webp`

Rules:
- lowercase only
- no spaces
- no `&` or accented chars in filenames
- stable slug by project

## Format policy

Images:
- Source masters in `src/assets/media-src/**`
- Delivery in `public/assets/media/**` with:
  - `avif` (primary)
  - `webp` (secondary)
  - `jpg/png` fallback only where needed
- Responsive widths: `640, 960, 1280, 1920`

Videos:
- H.264 MP4 (`+faststart`) as baseline compatibility
- 2 variants when possible:
  - `*-preview-*.mp4` (short/light)
  - `*-full-*.mp4` (full quality)
- Poster image mandatory (`*-poster-960.webp`)

## Loading policy in components

- Non-critical images: `loading="lazy" decoding="async"`
- Videos outside viewport: `preload="none"`
- Use IntersectionObserver to assign `src` only when near viewport
- Keep existing UX behavior (autoplay/muted/loop) once visible

## Migration strategy (no breaking changes)

### Phase 1 (safe, immediate)
- Keep current file paths alive.
- Introduce target directories.
- Add/extend generation scripts to output optimized files to target layout.
- Add media manifest (`src/assets/media-manifest.ts`) for new references.

### Phase 2 (dual-path)
- Move one domain at a time (ex: `projects/boda-nm`) into `public/assets/media/projects/boda-nm/**`.
- Keep temporary alias/duplicate in old path until all imports are migrated.
- Update component references minimally, route by route.

### Phase 3 (cleanup)
- Remove obsolete legacy paths.
- Enforce checks in CI (size budgets + forbidden direct imports from `media-src`).

## Suggested first migration batch (highest ROI)

1. `video-boda-N&M.mp4` -> `projects/boda-nm/videos/project-boda-nm-demo-full-1080.mp4`
2. `video-didacmania.mp4` -> `projects/didacmania/videos/project-didacmania-demo-full-1080.mp4`
3. `video-creyda-short.mp4` -> `projects/creyda/videos/project-creyda-demo-preview-1080.mp4`
4. `video-cledore.mp4` -> `projects/cledore/videos/project-cledore-demo-full-1080.mp4`
5. `blc6.png` -> `projects/blc/images/project-blc-screen-01-1920.webp` (+ avif)
6. `mockup2-bodamp.png` -> `projects/boda-mp/images/project-boda-mp-mockup-02-1920.webp` (+ avif)

## CI gates to add

- Fail if any image in delivery folders > 1.5 MiB
- Fail if any video in delivery folders > 8 MiB
- Fail if any component imports from `src/assets/media-src/**`
- Report top 20 heaviest assets on each build

## Execution checklist

1. Create directories and manifest skeleton.
2. Update image generation script to emit target naming/layout.
3. Add video optimization script with deterministic presets.
4. Migrate one project end-to-end (pilot: `boda-nm`).
5. Validate: lint, typecheck, build.
6. Repeat by domain.
