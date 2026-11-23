/**
 * Une petite détective, de face, qui tient une loupe devant un seul œil : dans le verre, cet œil
 * est agrandi et regarde autour de lui, pendant que l'autre œil, resté visible, fait un clin d'œil.
 * Même trait à l'encre que la ronde de la page Services.
 *
 * `seekerMarkup(0)` donne le dessin au repos (rendu côté serveur) ;
 * la page rappelle la fonction à chaque image avec le temps qui avance.
 */

const GY = 192; // le sol
const CYCLE = 9; // durée d'une séquence, en secondes

const f = (v: number) => v.toFixed(1);
const smooth = (u: number) => {
  const c = Math.min(1, Math.max(0, u));
  return c * c * (3 - 2 * c);
};

export function seekerMarkup(time = 0): string {
  const s = ((time % CYCLE) + CYCLE) % CYCLE;

  // le zoom : l'œil s'agrandit dans le verre entre 5 s et 8 s (la loupe, elle, ne bouge pas)
  const zoomIn = smooth((s - 5) / 0.7) * (1 - smooth((s - 7.4) / 0.9));

  // le personnage reste immobile : seuls les yeux bougent
  const head = { x: 100, y: 52, r: 22 };
  const hip = { x: 100, y: 138 };

  const neck = { x: head.x, y: head.y + head.r };
  // une robe évasée, de l'épaule au genou, et deux jambes dessous
  const hem = 152;
  const dress = `M${f(head.x - 7)},${f(neck.y + 3)} Q${f(head.x)},${f(neck.y - 1)} ${f(head.x + 7)},${f(neck.y + 3)} L${f(head.x + 24)},${f(hem)} Q${f(head.x)},${f(hem + 5)} ${f(head.x - 24)},${f(hem)} Z`;
  const legA = `M${f(hip.x - 7)},${f(hem + 2)} Q${f(hip.x - 9)},${f(172)} ${f(92)},${f(GY)}`;
  const legB = `M${f(hip.x + 7)},${f(hem + 2)} Q${f(hip.x + 9)},${f(172)} ${f(108)},${f(GY)}`;
  const shoulder = { x: head.x, y: neck.y + 8 };

  // le bras libre : le coude sorti, la main posée sur la hanche
  const freeArm = `M${f(head.x + 6)},${f(shoulder.y)} Q${f(head.x + 24)},${f(shoulder.y + 14)} ${f(head.x + 13)},${f(126)}`;

  // la loupe, décalée sur l'œil gauche (à gauche sur le dessin) ; le visage reste visible à droite
  const lens = { x: head.x - 13, y: head.y + 3, r: 20 };
  const hand = { x: lens.x + 5, y: lens.y + lens.r + 18 };
  const handle = `M${f(lens.x + 5)},${f(lens.y + lens.r - 0.5)} L${f(hand.x)},${f(hand.y + 9)}`;
  // le bras qui tient la loupe : le coude plié vers l'extérieur, l'avant-bras remonte vers le manche
  const elbow = { x: lens.x - 10, y: shoulder.y + 22 };
  const arm = `M${f(shoulder.x - 6)},${f(shoulder.y)} Q${f(elbow.x - 2)},${f(shoulder.y + 8)} ${f(elbow.x)},${f(elbow.y)} Q${f(elbow.x + 6)},${f(elbow.y + 5)} ${f(hand.x - 3)},${f(hand.y + 1)}`;
  const fist = `<path d="M${f(hand.x)},${f(hand.y)} l.1 0" class="dot"/>`;

  // l'œil dans le verre : il scrute, puis s'arrête et grossit
  const calm = 1 - zoomIn;
  const ex = (Math.sin(time * 1.1) * 4.5 + Math.sin(time * 2.7) * 1) * calm;
  const ey = Math.sin(time * 0.8 + 1) * 2 * calm;
  // un clignement toutes les 3,3 s
  const bt = (time % 3.3) / 0.22;
  const blink = bt < 1 ? Math.abs(Math.cos(Math.PI * bt)) : 1;
  const open = Math.max(0.04, blink) * (1 + 0.1 * zoomIn);
  const W = 13 * (1 + 0.1 * zoomIn); // demi-largeur de l'œil agrandi
  const cx = lens.x;
  const cy = lens.y;
  const irisR = 5.6 + 1 * zoomIn;
  const pupilW = 4.2 + 2.4 * zoomIn;

  const eyeShape =
    `M${f(cx - W)},${f(cy)} Q${f(cx)},${f(cy - 12.5 * open)} ${f(cx + W)},${f(cy)} ` +
    `Q${f(cx)},${f(cy + 12.5 * open)} ${f(cx - W)},${f(cy)} Z`;
  let eye = `<path d="${eyeShape}" class="paper"/>`;
  if (open > 0.45) {
    const ix = cx + ex;
    const iy = cy + ey;
    eye +=
      `<path d="M${f(ix - irisR)},${f(iy)} a${f(irisR)},${f(irisR)} 0 1,0 ${f(2 * irisR)},0 a${f(irisR)},${f(irisR)} 0 1,0 ${f(-2 * irisR)},0" class="iris"/>` +
      `<path d="M${f(ix)},${f(iy)} l.1 0" class="pupil" style="stroke-width:${f(pupilW)}"/>` +
      `<path d="M${f(ix - 2.2)},${f(iy - 2.4)} l.1 0" class="hi"/>`;
  }
  // le sourcil se lève quand ça zoome
  const brow = cy - 15 - 2.5 * zoomIn;
  eye += `<path d="M${f(cx - 10)},${f(brow + 2.5)} Q${f(cx)},${f(brow - 2)} ${f(cx + 10)},${f(brow + 2.5 - 1.5 * zoomIn)}"/>`;

  // l'autre œil, resté visible : un point, qui fait un clin d'œil de temps en temps
  const rx = head.x + 11;
  const ry = head.y + 1;
  const wink = (s > 2.6 && s < 3.2) || (s > 7.6 && s < 8.2);
  const otherEye = wink
    ? `<path d="M${f(rx - 4.5)},${f(ry + 1.5)} Q${f(rx)},${f(ry - 4)} ${f(rx + 4.5)},${f(ry + 1.5)}"/>`
    : `<path d="M${f(rx)},${f(ry)} l.1 0" class="dot"/>`;
  const otherBrow = `<path d="M${f(rx - 6)},${f(ry - 7)} Q${f(rx)},${f(ry - 10.5)} ${f(rx + 6)},${f(ry - 7.5)}"/>`;
  // le nez et le sourire
  const face =
    otherEye +
    otherBrow +
    `<path d="M${f(head.x + 4)},${f(head.y + 8)} l-2 5 l4 0"/>` +
    `<path d="M${f(head.x - 3)},${f(head.y + 16)} Q${f(head.x + 6)},${f(head.y + 21)} ${f(head.x + 14)},${f(head.y + 14)}"/>`;

  // les cheveux, longs, qui finissent par une boucle vers l'extérieur
  const hx = head.x;
  const hairL = `M${f(hx - 21)},${f(head.y - 6)} C${f(hx - 28)},${f(head.y + 14)} ${f(hx - 27)},${f(head.y + 32)} ${f(hx - 24)},${f(head.y + 46)} C${f(hx - 22)},${f(head.y + 54)} ${f(hx - 32)},${f(head.y + 57)} ${f(hx - 33)},${f(head.y + 49)}`;
  const hairR = `M${f(hx + 21)},${f(head.y - 6)} C${f(hx + 28)},${f(head.y + 14)} ${f(hx + 27)},${f(head.y + 32)} ${f(hx + 24)},${f(head.y + 46)} C${f(hx + 22)},${f(head.y + 54)} ${f(hx + 32)},${f(head.y + 57)} ${f(hx + 33)},${f(head.y + 49)}`;
  const hair = `<path d="${hairL}" class="limb"/><path d="${hairR}" class="limb"/><path d="${hairL}"/><path d="${hairR}"/>`;

  // le chapeau de détective, posé sur la tête (derrière le verre)
  const hy = head.y - 13;
  const hat =
    `<path d="M${f(head.x - 17)},${f(hy)} C${f(head.x - 20)},${f(hy - 24)} ${f(head.x + 20)},${f(hy - 24)} ${f(head.x + 19)},${f(hy)} Z" class="paper"/>` +
    `<path d="M${f(head.x - 17)},${f(hy - 5)} Q${f(head.x)},${f(hy - 2)} ${f(head.x + 18)},${f(hy - 5)}" class="band"/>` +
    // le petit ruban au sommet
    `<path d="M${f(head.x - 7)},${f(hy - 21)} l7,2 l7,-3 l-1,-4 l-6,3 l-6,-3 Z" class="paper"/>`;

  const ground =
    '<g style="--i:0">' +
    '<path d="M20,193.5 C60,191.5 112,194.5 156,193 S182,193.6 190,192.6"/>' +
    '<path d="M46,199 l.1 0 M100,201 l.1 0 M152,199.5 l.1 0" class="dot"/>' +
    '</g>';

  const person =
    '<g style="--i:1">' +
    `<path d="${legA}" class="limb"/><path d="${legB}" class="limb"/>` +
    hair +
    `<path d="M${f(head.x - head.r)},${f(head.y)} a${head.r},${head.r} 0 1,0 ${2 * head.r},0 a${head.r},${head.r} 0 1,0 ${-2 * head.r},0" class="paper"/>` +
    `<path d="${legA}"/><path d="${legB}"/>` +
    `<path d="${dress}" class="dress"/>` +
    `<path d="${freeArm}"/><path d="${arm}"/>` +
    fist +
    face +
    hat +
    '</g>';

  const glass =
    '<g style="--i:2">' +
    `<path d="${handle}" class="handle"/>` +
    `<path d="M${f(lens.x - lens.r)},${f(lens.y)} a${lens.r},${lens.r} 0 1,0 ${2 * lens.r},0 a${lens.r},${lens.r} 0 1,0 ${-2 * lens.r},0" class="lens"/>` +
    eye +
    `<path d="M${f(lens.x - lens.r + 3.5)},${f(lens.y - 8)} Q${f(lens.x - lens.r + 6)},${f(lens.y - 15)} ${f(lens.x - 6)},${f(lens.y - lens.r + 3.5)}" class="glint"/>` +
    '</g>';

  return ground + person + glass;
}
