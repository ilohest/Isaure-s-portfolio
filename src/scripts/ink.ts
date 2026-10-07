/**
 * Traits d'encre dessinés à la main : lignes horizontales irrégulières (double trait) et « # » tremblés.
 * Partagé par les pages Process et Work.
 */
const NS = 'http://www.w3.org/2000/svg';

export const rnd = (seed: number) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Remplit chaque élément (de largeur quelconque) d'un trait horizontal irrégulier, toujours différent. */
export const drawInkRules = (els: HTMLElement[], seedBase = 31) => {
  els.forEach((el, k) => {
    const w = Math.round(el.getBoundingClientRect().width);
    if (!w) return;
    const r = rnd(seedBase + k * 17);
    const phases = [r() * 6.28, r() * 6.28, r() * 6.28];
    const line = (offset: number, jitter: number) => {
      let d = '';
      let drift = 0;
      for (let x = 0; x <= w; x += 7) {
        drift += (r() - 0.5) * jitter;
        drift *= 0.94;
        const y =
          9 +
          offset +
          Math.sin(x / 140 + phases[0]) * 1.6 +
          Math.sin(x / 47 + phases[1]) * 0.9 +
          Math.sin(x / 13 + phases[2]) * 0.35 +
          drift;
        d += `${x ? 'L' : 'M'}${x},${y.toFixed(2)}`;
      }
      return d;
    };
    el.innerHTML =
      `<svg xmlns="${NS}" width="${w}" height="18" viewBox="0 0 ${w} 18" preserveAspectRatio="none">` +
      `<path class="r1" pathLength="1" d="${line(0, 1.1)}"/>` +
      `<path class="r2" pathLength="1" d="${line(1.3, 0.9)}"/></svg>`;
  });
};

/** Dessine un « # » à la main dans chaque élément (quatre traits qui dépassent, tous différents). */
export const drawInkHashes = (els: HTMLElement[], seedBase = 7) => {
  els.forEach((el, k) => {
    const r = rnd(seedBase + k * 29);
    const j = (a: number) => (r() - 0.5) * a;
    const x1 = 19 + j(8);
    const x2 = 44 + j(8);
    const y1 = 28 + j(9);
    const y2 = 54 + j(9);
    const lean = 3 + r() * 16; // inclinaison des verticaux, différente à chaque fois
    const stroke = (x0: number, y0: number, x3: number, y3: number, bow: number) => {
      const mx = (x0 + x3) / 2 + bow;
      const my = (y0 + y3) / 2 + j(4);
      return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x3.toFixed(1)},${y3.toFixed(1)}`;
    };
    const paths = [
      stroke(x1 + lean * 0.5 + j(5), 1 + r() * 11, x1 - lean * 0.5 + j(5), 79 - r() * 12, j(7)),
      stroke(x2 + lean * 0.5 + j(5), 0 + r() * 12, x2 - lean * 0.5 + j(5), 80 - r() * 13, j(7)),
      stroke(-2 + r() * 10, y1 + j(4), 64 - r() * 10, y1 - 4 + j(8), j(5)),
      stroke(-1 + r() * 11, y2 + j(4), 65 - r() * 9, y2 - 4 + j(8), j(5)),
    ];
    el.innerHTML =
      `<svg xmlns="${NS}" viewBox="-4 -2 72 84" aria-hidden="true" style="transform:rotate(${j(14).toFixed(1)}deg)">` +
      paths
        .map((d, i) => `<path pathLength="1" style="--i:${i};stroke-width:${(2.8 + r() * 3).toFixed(2)}" d="${d}"/>`)
        .join('') +
      `</svg>`;
    el.classList.add('has-svg');
  });
};
