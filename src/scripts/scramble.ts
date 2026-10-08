/**
 * Transition « lettres qui défilent » : l'ancien texte se brouille en lettres aléatoires très vite,
 * puis se fige lettre après lettre sur le nouveau. La mise en page est celle du texte final
 * (un double invisible réserve la place), donc rien ne bouge pendant l'effet.
 */
const KEEP = /[\s.,;:!?'’«»[\]—–\-()/&“”"…]/;
const POOL = 'abcdefghijklmnopqrstuvwxyzàéèêîôûABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Scr = HTMLElement & { _scr?: { ghost: HTMLElement; live: HTMLElement; raf: number; text: string } };

const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scramble = (el: HTMLElement, to: string, ms = 620, fromText?: string) => {
  const host = el as Scr;
  if (!host._scr) {
    const from = host.textContent ?? '';
    const ghost = document.createElement('span');
    const live = document.createElement('span');
    ghost.className = 'scr__ghost';
    live.className = 'scr__live';
    live.setAttribute('aria-hidden', 'true');
    host.textContent = '';
    host.append(ghost, live);
    host.classList.add('scr');
    host._scr = { ghost, live, raf: 0, text: from };
  }
  const s = host._scr;
  cancelAnimationFrame(s.raf);
  const from = fromText ?? s.text;
  s.ghost.textContent = to; // le lecteur d'écran lit le texte final
  s.text = to;
  if (reduce() || (fromText === undefined && from === to)) {
    s.live.textContent = to;
    return;
  }
  const n = to.length;
  const t0 = performance.now();
  const frame = (now: number) => {
    const t = now - t0;
    let out = '';
    for (let i = 0; i < n; i++) {
      const c = to[i];
      if (KEEP.test(c)) {
        out += c;
        continue;
      }
      const k = i / n;
      const settle = ms * (0.3 + 0.7 * k); // chaque lettre se fige un peu après la précédente
      const hold = ms * 0.18 * k; // l'ancienne lettre tient un très court instant
      if (t >= settle) out += c;
      else if (t < hold && from[i] && !KEEP.test(from[i])) out += from[i];
      else out += POOL[Math.floor(Math.random() * POOL.length)];
    }
    s.live.textContent = out;
    if (t < ms) s.raf = requestAnimationFrame(frame);
    else s.live.textContent = to;
  };
  frame(t0); // première image tout de suite : jamais de texte vide
  s.raf = requestAnimationFrame(frame);
  window.setTimeout(() => {
    if (s.text === to) s.live.textContent = to;
  }, ms + 120);
};
