/**
 * Une petite goutte d'eau qui suit le pointeur, dessinée au trait comme le bateau.
 * Elle suit avec un léger retard (ressort) et se déforme selon la vitesse :
 * allongée dans le sens du mouvement, la pointe en traîne.
 */
export {};

const fine = window.matchMedia('(pointer: fine)').matches && window.matchMedia('(hover: hover)').matches;
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (fine && !reduce && !document.querySelector('.droplet')) {
  const NS = 'http://www.w3.org/2000/svg';
  const el = document.createElementNS(NS, 'svg');
  el.setAttribute('class', 'droplet');
  el.setAttribute('viewBox', '-14 -10 28 20');
  el.setAttribute('width', '28');
  el.setAttribute('height', '20');
  el.setAttribute('aria-hidden', 'true');
  // tête ronde vers +x, pointe qui traîne vers -x
  el.innerHTML =
    '<g filter="url(#boat-rough)">' +
    '<path class="droplet__fill" d="M-11,0 C-5,-0.6 -2.5,-5.6 2.8,-5.6 C7,-5.6 9,-2.8 9,0 C9,2.8 7,5.6 2.8,5.6 C-2.5,5.6 -5,0.6 -11,0 Z"/>' +
    '<path class="droplet__line" d="M-10.6,-0.1 C-5,-0.7 -2.6,-5.4 2.8,-5.4 C6.8,-5.4 8.8,-2.8 8.8,0 C8.8,2.7 6.8,5.4 2.8,5.4 C-2.6,5.4 -5,0.6 -10.6,0.2"/>' +
    '<path class="droplet__shine" d="M3.2,-3.2 C5,-3.2 6.2,-2.2 6.4,-0.8"/>' +
    '</g>';
  document.body.appendChild(el);

  const target = { x: -100, y: -100 };
  const pos = { x: -100, y: -100 };
  const vel = { x: 0, y: 0 };
  let angle = 90; // au repos : la pointe vers le haut, comme une vraie goutte
  let sx = 1;
  let seen = false;
  let last = performance.now();

  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse') return;
      target.x = e.clientX + 16;
      target.y = e.clientY + 18;
      if (!seen) {
        seen = true;
        pos.x = target.x;
        pos.y = target.y;
        el.classList.add('is-on');
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-on'));
  document.documentElement.addEventListener('pointerenter', () => seen && el.classList.add('is-on'));

  const frame = (now: number) => {
    const dt = Math.min(2, (now - last) / 16.67);
    last = now;
    // ressort amorti vers la cible
    vel.x += (target.x - pos.x) * 0.12 * dt;
    vel.y += (target.y - pos.y) * 0.12 * dt;
    const damp = Math.pow(0.74, dt);
    vel.x *= damp;
    vel.y *= damp;
    pos.x += vel.x * dt;
    pos.y += vel.y * dt;

    const speed = Math.hypot(vel.x, vel.y);
    // orientation : suit la direction du mouvement, retombe pointe en haut à l'arrêt
    const want = speed > 0.9 ? (Math.atan2(vel.y, vel.x) * 180) / Math.PI : 90;
    let diff = ((want - angle + 540) % 360) - 180;
    angle += diff * Math.min(1, (speed > 0.9 ? 0.25 : 0.08) * dt);
    // déformation : allongée selon la vitesse, aplatie en travers (volume conservé)
    const wantSx = 1 + Math.min(speed * 0.045, 0.55);
    sx += (wantSx - sx) * Math.min(1, 0.2 * dt);
    const sy = 1 / Math.sqrt(sx);

    el.style.transform = `translate3d(${pos.x - 14}px, ${pos.y - 10}px, 0) rotate(${angle}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
