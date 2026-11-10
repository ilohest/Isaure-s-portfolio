/**
 * Une ronde de cinq personnes qui se tiennent par la main (clin d'œil à « La Danse » de Matisse),
 * dans le même trait à l'encre que les icônes des services.
 *
 * `ringMarkup(0, 0)` donne le dessin au repos (rendu côté serveur) ;
 * la page rappelle la fonction à chaque image avec une phase qui avance pour faire tourner la ronde.
 */

const CX = 120;
const CY = 104;
const RX = 88;
const RY = 30;
const N = 5;

const f = (v: number) => v.toFixed(1);

type Part = { depth: number; svg: string };

/**
 * @param phase rotation de la ronde, en degrés (le sens des aiguilles d'une montre quand elle augmente)
 * @param t temps écoulé, en secondes (rebond et pas de danse)
 */
export function ringMarkup(phase = 0, t = 0): string {
  const bodies = Array.from({ length: N }, (_, k) => {
    const a = ((-90 + k * (360 / N) + phase) * Math.PI) / 180;
    const x = CX + RX * Math.cos(a);
    const y = CY + RY * Math.sin(a);
    const ox = Math.cos(a); // vers l'extérieur du cercle
    const tx = -Math.sin(a); // sens de la danse
    const s = k % 2 ? 1 : -1;
    // un petit saut sur chaque temps, décalé d'une personne à l'autre
    const beat = Math.sin(t * 5.5 + k * 1.7);
    const hop = Math.max(0, beat) * 2.6;
    const hip = { x: x - ox * 2, y: y - 28 - hop };
    const neck = { x: x + ox * 6, y: y - 51 - hop };
    return { k, x, y, ox, tx, s, beat, hip, neck, shoulder: { x: neck.x, y: neck.y + 4 } };
  });

  const parts: Part[] = [];

  bodies.forEach((b) => {
    const { k, x, y, ox, tx, s, beat, hip, neck } = b;
    // un pied à plat, une jambe qui s'élance dans le sens de la ronde
    const plant = { x: x - tx * 3 - ox * 2, y };
    const kick = { x: x + tx * 15 + s * 5 + beat * 3, y: y - 8 - Math.max(0, beat) * 2 };
    const torso = `M${f(neck.x)},${f(neck.y)} Q${f(x + ox)},${f(y - 40 - (hip.y - (y - 28)))} ${f(hip.x)},${f(hip.y)}`;
    const legA = `M${f(hip.x)},${f(hip.y)} C${f(hip.x - tx * 2)},${f(y - 18)} ${f(plant.x)},${f(y - 9)} ${f(plant.x)},${f(plant.y)}`;
    const legB = `M${f(hip.x)},${f(hip.y)} C${f(hip.x + tx * 6)},${f(y - 22)} ${f(kick.x - tx * 6)},${f(kick.y - 8)} ${f(kick.x)},${f(kick.y)}`;
    const hx = neck.x + ox * 2.5;
    const hy = neck.y - 7.5;
    parts.push({
      depth: y,
      svg:
        `<g style="--i:${k}">` +
        // coups de pinceau pleins (translucides), puis le trait fin par-dessus
        `<path d="${torso}" class="body"/>` +
        `<path d="${legA}" class="limb"/><path d="${legB}" class="limb"/>` +
        `<path d="M${f(hx - 7)},${f(hy)} a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0" class="paper"/>` +
        `<path d="${torso}"/><path d="${legA}"/><path d="${legB}"/>` +
        '</g>',
    });
  });

  // les bras : un arc entre les épaules de deux voisins, les mains jointes au milieu
  bodies.forEach((b, k) => {
    const c = bodies[(k + 1) % N];
    const ax = b.shoulder.x;
    const ay = b.shoulder.y;
    const bx = c.shoulder.x;
    const by = c.shoulder.y;
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2;
    const px = mx + (mx - CX) * 0.1;
    const py = my + 11;
    const hx = 0.25 * ax + 0.5 * px + 0.25 * bx;
    const hy = 0.25 * ay + 0.5 * py + 0.25 * by;
    parts.push({
      depth: (b.y + c.y) / 2 - 0.5,
      svg:
        `<g style="--i:${N}">` +
        `<path d="M${f(ax)},${f(ay)} Q${f(px)},${f(py)} ${f(bx)},${f(by)}"/>` +
        `<path d="M${f(hx)},${f(hy)} l.1 0" class="dot"/>` +
        '</g>',
    });
  });

  // ceux du fond d'abord, ceux de devant par-dessus
  return parts
    .sort((p, q) => p.depth - q.depth)
    .map((p) => p.svg)
    .join('');
}
