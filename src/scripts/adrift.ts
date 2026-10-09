/**
 * Page 404 : une rivière fine qui coule, gonfle sous le pointeur, et se perd dans un tourbillon, où le bateau tourne à la dérive.
 */
export {};

type Pt = [number, number];
const NS = 'http://www.w3.org/2000/svg';
const stage = document.querySelector<HTMLElement>('[data-adrift]');
if (stage) {
  const f1 = (v: number) => v.toFixed(1);
  const hash = (i: number) => {
    let h = Math.imul(i ^ 0x9e3779b9, 0x85ebca6b);
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35);
    h ^= h >>> 16;
    return ((h >>> 0) / 4294967295) * 2 - 1;
  };
  const vnoise = (x: number, seed: number) => {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    return hash(i + seed * 7919) * (1 - u) + hash(i + 1 + seed * 7919) * u;
  };
  const catmull = (pts: Pt[], sub = 24): Pt[] => {
    const out: Pt[] = [];
    const n = pts.length;
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(n - 1, i + 2)];
      for (let k = 0; k < sub; k++) {
        const t = k / sub;
        const t2 = t * t;
        const t3 = t2 * t;
        const f = (a: number, b: number, c: number, d: number) =>
          0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
        out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
      }
    }
    out.push(pts[n - 1]);
    return out;
  };
  const resample = (poly: Pt[], step: number): Pt[] => {
    const out: Pt[] = [poly[0]];
    let carry = 0;
    for (let i = 1; i < poly.length; i++) {
      let [ax, ay] = poly[i - 1];
      const [bx, by] = poly[i];
      let seg = Math.hypot(bx - ax, by - ay);
      while (carry + seg >= step) {
        const k = (step - carry) / seg;
        ax += (bx - ax) * k;
        ay += (by - ay) * k;
        out.push([ax, ay]);
        seg = Math.hypot(bx - ax, by - ay);
        carry = 0;
      }
      carry += seg;
    }
    return out;
  };

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointer = { x: -9999, y: -9999 };
  let raf = 0;
  let stepRain: (now: number, count: number) => void = () => {};
  window.addEventListener('pointermove', (e) => {
    const r = stage.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  });

  // ------------------------------------------------ la pluie (mêmes gouttes que l'accueil) et la bulle de BD
  const boatBtn = stage.querySelector<HTMLButtonElement>('[data-boat]')!;
  const bubble = stage.querySelector<HTMLElement>('[data-bubble]')!;
  const ghost = bubble.querySelector<HTMLElement>('[data-ghost]')!;
  const typed = bubble.querySelector<HTMLElement>('[data-typed]')!;
  const live = bubble.querySelector<HTMLElement>('[data-live]')!;
  const isEn = location.pathname === '/en' || location.pathname.startsWith('/en/');
  const jokes = JSON.parse(bubble.dataset[isEn ? 'jokesEn' : 'jokesFr'] ?? '[]') as string[];
  if (isEn) {
    boatBtn.setAttribute('aria-label', boatBtn.dataset.labelEn ?? '');
  }
  // une histoire suivie : on la joue dans l'ordre, du début, puis elle reprend (le dernier mot appelle le premier)
  let jokeIdx = 0;
  let typeTimer = 0;
  let nextTimer = 0;
  let paused = false;
  // l'histoire s'écrit toute seule : une fois la phrase lue, la suivante prend le relais.
  // (pause au survol / au focus du bateau, onglet masqué ou « réduire les animations » : jamais de texte qui change sans qu'on puisse l'arrêter)
  const scheduleNext = (len: number) => {
    window.clearTimeout(nextTimer);
    if (reduce || paused || document.hidden) return;
    nextTimer = window.setTimeout(() => {
      jokeIdx++;
      say(true, false);
      burst(900);
    }, 1500 + len * 28);
  };
  const say = (animate: boolean, announce = true) => {
    const text = jokes[jokeIdx % jokes.length] ?? '';
    window.clearInterval(typeTimer);
    window.clearTimeout(nextTimer);
    ghost.textContent = text;
    bubble.classList.remove('is-done');
    if (announce) live.textContent = text; // lecteurs d'écran : seulement la première phrase et celles demandées
    if (!animate || reduce) {
      typed.textContent = text;
      bubble.classList.add('is-done');
      return;
    }
    let c = 0;
    typed.textContent = '';
    typeTimer = window.setInterval(() => {
      c++;
      typed.textContent = text.slice(0, c);
      if (c >= text.length) {
        window.clearInterval(typeTimer);
        bubble.classList.add('is-done');
        scheduleNext(text.length);
      }
    }, 19);
  };
  const setPaused = (v: boolean) => {
    paused = v;
    if (v) window.clearTimeout(nextTimer);
    else if (bubble.classList.contains('is-done')) scheduleNext(0);
  };
  boatBtn.addEventListener('pointerenter', () => setPaused(true));
  boatBtn.addEventListener('pointerleave', () => setPaused(false));
  boatBtn.addEventListener('focus', () => setPaused(true));
  boatBtn.addEventListener('blur', () => setPaused(false));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) window.clearTimeout(nextTimer);
    else if (!paused && bubble.classList.contains('is-done')) scheduleNext(0);
  });

  interface Drop { x: number; y: number; vy: number; vx: number; endY: number; ripple: boolean; el: SVGGElement }
  interface Ripple { x: number; y: number; age: number; el: SVGEllipseElement }
  let rainG: SVGGElement | null = null;
  let drops: Drop[] = [];
  let ripples: Ripple[] = [];
  let rainAcc = 0;
  let rainLast = 0;
  let burstUntil = 0;
  let boatCx = 0;
  let boatCy = 0;
  const burst = (ms: number) => (burstUntil = performance.now() + ms);
  boatBtn.addEventListener('pointerenter', () => burst(1400));
  boatBtn.addEventListener('click', () => {
    jokeIdx++;
    say(true);
    burst(2400);
    boatBtn.classList.remove('is-spin');
    void boatBtn.offsetWidth; // relance l'animation
    boatBtn.classList.add('is-spin');
  });
  boatBtn.addEventListener('animationend', (e) => {
    if ((e as AnimationEvent).animationName === 'adrift-spin') boatBtn.classList.remove('is-spin');
  });
  say(!reduce);

  const draw = () => {
    stage.querySelector('.adrift__svg')?.remove();
    stage.querySelector('.adrift__rain')?.remove();
    const boatEl = boatBtn;
    const W = stage.clientWidth;
    stage.style.minHeight = '';
    let H = stage.clientHeight;
    const narrow = W < 800;
    const R = narrow ? Math.min(W * 0.22, 90) : Math.min(H * 0.26, 150);
    // tourbillon : centre à droite sur grand écran ; sur mobile, sous le texte et sous la bulle (la page s'allonge au besoin)
    let cyN = H * 0.72;
    if (narrow) {
      const copy = stage.querySelector<HTMLElement>('.adrift__copy:not([hidden])');
      const copyBottom = copy ? copy.offsetTop + copy.offsetHeight : H * 0.5;
      cyN = Math.max(H * 0.72, copyBottom + (bubble.offsetHeight || 110) + 100);
      const need = Math.ceil(cyN + R * 1.4 + 40);
      if (need > H) {
        stage.style.minHeight = `${need}px`;
        H = stage.clientHeight;
      }
    }
    const cx = narrow ? W * 0.5 : W * 0.7;
    const cy = narrow ? cyN : H * 0.56;
    const entry: Pt[] = narrow
      ? [[-40, cy - R * 1.6], [W * 0.2, cy - R * 2.1], [W * 0.62, cy - R * 1.8], [cx + R * 1.1, cy - R * 0.6]]
      : [[-50, H * 0.88], [W * 0.12, H * 0.84], [W * 0.3, H * 0.9], [W * 0.46, H * 0.76], [cx - R * 1.4, cy + R * 0.9], [cx - R * 1.05, cy + R * 0.1]];
    // spirale qui se resserre vers le centre
    const spiral: Pt[] = [];
    for (let k = 0; k <= 22; k++) {
      const a = Math.PI + k * 0.52;
      const r = R * (1.05 - (k / 22) * 0.86);
      spiral.push([cx + Math.cos(a) * r * 1.12, cy + Math.sin(a) * r * 0.82]);
    }
    const poly = resample(catmull([...entry, ...spiral]), 5);
    const n = poly.length;
    const NX: number[] = [];
    const NY: number[] = [];
    for (let i = 0; i < n; i++) {
      const a = poly[Math.max(0, i - 1)];
      const b = poly[Math.min(n - 1, i + 1)];
      const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      NX.push(-(b[1] - a[1]) / l);
      NY.push((b[0] - a[0]) / l);
    }
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'adrift__svg');
    svg.setAttribute('width', String(W));
    svg.setAttribute('height', String(H));
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      `<defs><linearGradient id="ad-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">` +
      `<stop offset="0" stop-color="#3a74d6"/><stop offset="1" stop-color="#5a9be8"/></linearGradient></defs>` +
      `<path class="ad__body" fill="url(#ad-grad)"/>`;
    const body = svg.querySelector('.ad__body')!;
    const t0 = performance.now();

    // une image : la matière coule le long du lit, et le ruban gonfle près du pointeur
    const frame = (now: number) => {
      const t = reduce ? 0 : (now - t0) / 1000;
      const flow = t * 38;
      // la rivière se trace le long de son lit, dans le sens du courant, la tête effilée en pointe
      const progress = reduce ? 1 : Math.min(1, t / 3.4);
      const eased = 1 - (1 - progress) ** 3;
      const count = Math.max(2, Math.floor(n * eased));
      const L: string[] = [];
      const Rr: string[] = [];
      for (let i = 0; i < count; i++) {
        const s = i * 5;
        const u = i / n;
        const taper = progress < 1 ? Math.min(1, (count - i) / 16) : 1;
        const sway = reduce ? 0 : Math.sin((s - flow * 1.6) / 150) * 5 + Math.sin((s - flow * 2.3) / 57) * 1.6;
        const px = poly[i][0] + NX[i] * sway;
        const py = poly[i][1] + NY[i] * sway;
        // le ruban s'amincit en se rapprochant du centre du tourbillon
        let w = (narrow ? 12 : 17) * (0.85 + 0.25 * vnoise((s - flow) / 90, 3)) * Math.max(0.1, Math.min(1, i / 30) * (1 - u * 0.78));
        // l'extrémité (centre du tourbillon) s'effile en pointe, au lieu d'être coupée net
        const edge = taper * Math.min(1, Math.max(0.04, (n - 1 - i) / 26));
        w *= edge;
        const dx = poly[i][0] - pointer.x;
        const dy = poly[i][1] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 130 * 130) w += 12 * (1 - Math.sqrt(d2) / 130) ** 2 * Math.min(1, i / 30) * edge; // le renflement s'efface aussi vers la pointe
        // le tremblé des bords s'efface avec la largeur : une pointe reste une pointe
        const jt = Math.min(1, w / 6);
        const jl = (1.4 * vnoise(s / 60, 11) + 0.6 * vnoise((s - flow * 0.15) / 12, 12) + 0.3 * vnoise(s / 4, 13)) * jt;
        const jr = (1.4 * vnoise(s / 70, 21) + 0.6 * vnoise((s - flow * 0.15) / 11, 22) + 0.3 * vnoise(s / 4.4, 23)) * jt;
        L.push(`${f1(px + NX[i] * (w / 2 + jl))},${f1(py + NY[i] * (w / 2 + jl))}`);
        Rr.push(`${f1(px - NX[i] * (w / 2 + jr))},${f1(py - NY[i] * (w / 2 + jr))}`);
      }
      body.setAttribute('d', `M${L.join('L')}L${Rr.reverse().join('L')}Z`);
      if (!reduce) stepRain(now, count);
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(frame);
    stage.prepend(svg);
    boatEl.style.left = `${cx - 31}px`;
    boatEl.style.top = `${cy - 20}px`;
    boatCx = cx;
    boatCy = cy;

    // la bulle : au-dessus du bateau, la queue pointée sur lui
    const bw = bubble.offsetWidth || 260;
    const bl = Math.max(14, Math.min(W - bw - 14, cx - bw / 2));
    bubble.style.left = `${bl}px`;
    bubble.style.bottom = `${H - (cy - 20) + 34}px`;
    bubble.style.setProperty('--tail-x', `${Math.max(34, Math.min(bw - 34, cx - bl))}px`);

    // la pluie : une couche de gouttes au-dessus de la rivière (elle tombe surtout dans l'eau, où elle fait des ronds)
    const rainSvg = document.createElementNS(NS, 'svg');
    rainSvg.setAttribute('class', 'adrift__rain');
    rainSvg.setAttribute('width', String(W));
    rainSvg.setAttribute('height', String(H));
    rainSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    rainSvg.setAttribute('aria-hidden', 'true');
    rainG = document.createElementNS(NS, 'g') as SVGGElement;
    rainG.setAttribute('class', 'rain');
    rainSvg.appendChild(rainG);
    stage.appendChild(rainSvg);
    drops = [];
    ripples = [];
    const spawn = (now: number, count: number) => {
      const boating = now < burstUntil && Math.random() < 0.6;
      let tx: number;
      let ty: number;
      let ripple = true;
      if (boating) {
        tx = boatCx + (Math.random() - 0.5) * 130;
        ty = boatCy + 2 + Math.random() * 14;
      } else if (count > 40 && Math.random() < 0.8) {
        const i = Math.floor(count * (0.2 + Math.random() * 0.8));
        tx = poly[Math.min(i, count - 1)][0] + (Math.random() - 0.5) * 16;
        ty = poly[Math.min(i, count - 1)][1] + (Math.random() - 0.5) * 6;
      } else {
        tx = Math.random() * W;
        ty = H * (0.25 + Math.random() * 0.75);
        ripple = false;
      }
      const vy = 120 + Math.random() * 70;
      const vx = -6 - Math.random() * 4; // un léger vent
      const y0 = -24 - Math.random() * 40;
      const T = Math.max(0.2, (ty - y0) / vy);
      const el = document.createElementNS(NS, 'g') as SVGGElement;
      const sc = 0.4 + Math.random() * 0.3;
      el.innerHTML =
        '<path class="droplet__fill" d="M-11,0 C-5,-0.6 -2.5,-5.6 2.8,-5.6 C7,-5.6 9,-2.8 9,0 C9,2.8 7,5.6 2.8,5.6 C-2.5,5.6 -5,0.6 -11,0 Z"/>' +
        '<path class="droplet__line" d="M-10.6,-0.1 C-5,-0.7 -2.6,-5.4 2.8,-5.4 C6.8,-5.4 8.8,-2.8 8.8,0 C8.8,2.7 6.8,5.4 2.8,5.4 C-2.6,5.4 -5,0.6 -10.6,0.2"/>';
      el.dataset.sc = String(sc);
      rainG!.appendChild(el);
      drops.push({ x: tx - vx * T, y: y0, vy, vx, endY: ty, ripple, el });
    };
    stepRain = (now: number, count: number) => {
      const dt = Math.min(0.05, rainLast ? (now - rainLast) / 1000 : 0.016);
      rainLast = now;
      rainAcc += dt * (now < burstUntil ? 30 : 8);
      while (rainAcc >= 1 && drops.length < 110) {
        rainAcc -= 1;
        spawn(now, count);
      }
      drops = drops.filter((d) => {
        d.y += d.vy * dt;
        d.x += d.vx * dt;
        if (d.y >= d.endY) {
          if (d.ripple) {
            const e = document.createElementNS(NS, 'ellipse') as SVGEllipseElement;
            e.setAttribute('class', 'droplet__line');
            e.setAttribute('fill', 'none');
            rainG!.appendChild(e);
            ripples.push({ x: d.x, y: d.endY, age: 0, el: e });
          }
          d.el.remove();
          return false;
        }
        const sc = Number(d.el.dataset.sc);
        // la goutte tombe tête en bas, étirée par la vitesse
        d.el.setAttribute('transform', `translate(${f1(d.x)} ${f1(d.y)}) rotate(90) scale(${(sc * 1.25).toFixed(2)} ${(sc * 0.9).toFixed(2)})`);
        return true;
      });
      ripples = ripples.filter((r) => {
        r.age += dt / 1.1;
        if (r.age >= 1) {
          r.el.remove();
          return false;
        }
        r.el.setAttribute('cx', f1(r.x));
        r.el.setAttribute('cy', f1(r.y));
        r.el.setAttribute('rx', (1.6 + r.age * 8).toFixed(1));
        r.el.setAttribute('ry', (0.6 + r.age * 2.6).toFixed(1));
        r.el.setAttribute('opacity', (0.8 * (1 - r.age)).toFixed(2));
        return true;
      });
    };
  };

  draw();
  let rt = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(rt);
    rt = window.setTimeout(draw, 160);
  });

  // langue : /en/… → anglais, sinon français (une seule 404.html pour tout le site)
  if (location.pathname === '/en' || location.pathname.startsWith('/en/')) {
    document.documentElement.lang = 'en';
    document.querySelectorAll<HTMLElement>('[data-l="fr"]').forEach((e) => (e.hidden = true));
    document.querySelectorAll<HTMLElement>('[data-l="en"]').forEach((e) => (e.hidden = false));
  }
}
