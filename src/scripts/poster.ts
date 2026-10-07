import { generatePoster } from '../lib/poster';
import type { LinkKey, PosterLayout } from '../lib/poster';

const LINKS: LinkKey[] = ['work', 'services', 'contact', 'about', 'process', 'ai'];

const root = document.querySelector<HTMLElement>('[data-poster]');
if (root) {
  const labels = JSON.parse(root.dataset.labels ?? '{}') as Record<LinkKey, string>;
  const hrefs = JSON.parse(root.dataset.hrefs ?? '{}') as Record<LinkKey, string>;
  const title = root.dataset.title ?? '';
  const NS = 'http://www.w3.org/2000/svg';
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

  const render = (p: PosterLayout, animate: boolean) => {
    const gradients = (id: string, c1: string, c2: string, g: PosterLayout['regions'][0]['grad']) =>
      `<linearGradient id="${id}" x1="${g.x1}" y1="${g.y1}" x2="${g.x2}" y2="${g.y2}"><stop offset="0" style="stop-color:var(--${c1})"/><stop offset="1" style="stop-color:var(--${c2})"/></linearGradient>`;

    const defs =
      `<filter id="f-wide" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="6"/></filter>` +
      `<filter id="f-mid" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="1.5"/></filter>` +
      p.regions
        .map(
          (r) =>
            gradients(`g${r.id}`, r.color, r.color2, r.grad) + `<clipPath id="c${r.id}"><path d="${r.path}"/></clipPath>`,
        )
        .join('') +
      p.overlays
        .map(
          (o, i) =>
            gradients(`o${i}`, o.color, o.color2, o.grad) + `<clipPath id="oc${i}"><path d="${o.path}"/></clipPath>`,
        )
        .join('');

    const regions = p.regions
      .map((r) => {
        const body =
          `<path class="r-fill" d="${r.path}" fill="url(#g${r.id})"/>` +
          `<g clip-path="url(#c${r.id})" class="r-glow">` +
          `<path class="r-wide" d="${r.path}" stroke="url(#g${r.id})" filter="url(#f-wide)"/>` +
          `<path class="r-mid" d="${r.path}" stroke="url(#g${r.id})" filter="url(#f-mid)"/></g>` +
          `<path class="r-line" d="${r.path}" pathLength="1" stroke="url(#g${r.id})"/>` +
          (r.label ? `<text class="r-label" x="${r.label.x}" y="${r.label.y}">${esc(labels[r.label.link] ?? '')}</text>` : '');
        return r.link
          ? `<a class="region region--link" href="${hrefs[r.link]}" style="--delay:${r.delay}ms" aria-label="${esc(labels[r.link] ?? '')}"${
              r.link === 'ai' ? ' target="_blank" rel="noopener noreferrer"' : ''
            }>${body}</a>`
          : `<g class="region" style="--delay:${r.delay}ms" aria-hidden="true">${body}</g>`;
      })
      .join('');

    const overlays = p.overlays
      .map(
        (o, i) =>
          `<g class="overlay" style="--delay:${o.delay}ms" aria-hidden="true">` +
          `<g clip-path="url(#oc${i})" class="r-glow"><path class="r-wide" d="${o.path}" stroke="url(#o${i})" filter="url(#f-wide)"/>` +
          `<path class="r-mid" d="${o.path}" stroke="url(#o${i})" filter="url(#f-mid)"/></g>` +
          `<path class="r-line" d="${o.path}" pathLength="1" stroke="url(#o${i})"/></g>`,
      )
      .join('');

    const pad = 3;
    root.innerHTML =
      `<svg xmlns="${NS}" class="poster__svg${animate ? '' : ' is-static'}" viewBox="${-pad} ${-pad} ${p.width + pad * 2} ${p.height + pad * 2}" ` +
      `width="${p.width}" height="${p.height}" role="group" aria-label="${esc(title)}">` +
      `<defs>${defs}</defs>${regions}${overlays}</svg>`;
  };

  let key = '';
  let first = true;
  const build = () => {
    const rect = root.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (!width || !height) return;
    const target = width < 600 ? 68 : width < 1000 ? 92 : 110;
    const k = `${width}x${height}`;
    if (k === key) return;
    key = k;
    render(generatePoster({ width, height, target, links: LINKS }), first);
    first = false;
  };

  build();
  let t = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(t);
    t = window.setTimeout(build, 180);
  });
}
