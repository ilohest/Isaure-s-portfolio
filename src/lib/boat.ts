/**
 * Le bateau en papier, dessiné au trait comme le poisson (traits de pinceau ouverts, épaisseurs variables).
 * Un seul dessin, partagé par le logo, le bouton, la rivière et le favicon.
 * Le filtre #boat-rough (tremblé de main) est défini une fois dans SiteLayout.
 */
export const BOAT_VIEWBOX = '0 0 62 40';

export const boatInner =
  '<g filter="url(#boat-rough)">' +
  // papier (fond très léger)
  '<path class="boat-paper" d="M3,19.5 C16,20.6 44,20.4 58,19 L48,32.5 C38,33.4 22,33.4 13,32.5 Z"/>' +
  '<path class="boat-paper" d="M31,2.5 C38,8.5 45,13.5 52.5,18 L31,18.4 Z"/>' +
  '<path class="boat-paper boat-paper--b" d="M28,7 C22,11.5 16,15 10,18 L28,18.2 Z"/>' +
  // coque
  '<path class="boat-line" d="M3,19.6 C16,21 44,20.6 58.2,18.8"/>' +
  '<path class="boat-line boat-line--thin" d="M3.4,19.8 C7.5,25.5 10.6,29.5 13.6,32.4"/>' +
  '<path class="boat-line boat-line--thin" d="M58,19.2 C54.4,24.6 51,29 47.6,32.6"/>' +
  '<path class="boat-line" d="M13.4,32.6 C22,33.7 38,33.3 47.8,32.5"/>' +
  '<path class="boat-line boat-line--thick" d="M5,21.4 C20,22.8 40,22.4 55,20.8"/>' +
  // grande voile
  '<path class="boat-line" d="M31.2,2.2 C37,8 44.5,13 52.6,17.6"/>' +
  '<path class="boat-line boat-line--thin" d="M31,2 C30.5,8 31.3,13.5 30.8,18.2"/>' +
  '<path class="boat-line boat-line--thin" d="M31.6,18.4 C38.5,18.9 45,18.3 52.4,17.9"/>' +
  '<path class="boat-line boat-line--thick" d="M33.5,9.6 C38.5,12.6 43.5,15.4 48.4,17.3"/>' +
  // petite voile
  '<path class="boat-line" d="M28,6.8 C22.4,11.3 16.2,14.8 9.8,17.9"/>' +
  '<path class="boat-line boat-line--thin" d="M28.2,7.4 C28.6,11 27.7,14.6 28.1,18.1"/>' +
  // plis du papier
  '<path class="boat-line boat-line--fold" d="M8,20.6 L16,30 M31,20 L31.4,31.6"/>' +
  // eau
  '<path class="boat-line boat-line--thin boat-line--wave" d="M2,37.4 C8,34.6 13,38.6 20,36.6 S33,35 41,37.6 S54,35.4 60,37"/>' +
  '</g>';
