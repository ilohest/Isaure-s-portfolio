/**
 * Mini-console en machine à écrire (page About) : les lignes s'écrivent une à une,
 * les plus anciennes remontent et disparaissent. Démarre quand la fenêtre est visible.
 */
const el = document.querySelector<HTMLElement>('[data-console]');
if (el) {
  const phrases = JSON.parse(el.dataset.phrases ?? '[]') as string[];
  const max = Number(el.dataset.lines ?? 6);
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const shown: string[] = [];
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const render = (typing = '') => {
    const lines = typing ? [...shown.slice(-(max - 1)), typing] : shown.slice(-max);
    el.innerHTML = lines
      .map((l, k) => `<div class="cons__line"${typing && k === lines.length - 1 ? ' data-typing' : ''}><b>&gt;</b> ${esc(l)}</div>`)
      .join('');
  };
  let i = Math.floor(Math.random() * Math.max(1, phrases.length));
  let stopped = true;
  const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));
  const run = async () => {
    stopped = false;
    while (!stopped) {
      const text = phrases[i % phrases.length];
      for (let c = 1; c <= text.length && !stopped; c++) {
        render(text.slice(0, c));
        await wait(34 + Math.random() * 40);
      }
      shown.push(text);
      render();
      i++;
      await wait(1300);
    }
  };
  if (reduce) {
    shown.push(...phrases.slice(0, max));
    render();
  } else {
    new IntersectionObserver((entries) => {
      const on = entries[0].isIntersecting;
      if (on && stopped) void run();
      if (!on) stopped = true;
    }).observe(el);
  }
}
