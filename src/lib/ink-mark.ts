/**
 * Passage souligné à la main, qui peut se couper sur plusieurs lignes.
 *
 * Chaque mot a son propre trait (insécable) ; les mots sont séparés par de vrais espaces, où le texte peut passer à la ligne.
 * Les traits des mots d'un même passage sont reliés par-dessus l'espace (classe `ink-u--join`) et se tracent l'un après l'autre.
 */
export const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/**
 * @param escapedText le texte, déjà échappé
 * @param phrase le passage à souligner (non échappé)
 * La ponctuation qui suit le passage reste collée à son dernier mot (elle ne passe jamais seule à la ligne).
 */
export function underline(escapedText: string, phrase: string): string {
  const p = esc(phrase);
  const i = escapedText.indexOf(p);
  if (i < 0) return escapedText;
  const punct = escapedText.slice(i + p.length).match(/^[.,;:!?…]*/)?.[0] ?? '';
  const words = p.split(' ');
  const html = words
    .map((w, k) => {
      const last = k === words.length - 1;
      return `<span class="ink-u${last ? '' : ' ink-u--join'}">${w}${last ? punct : ''}<i class="ink-u__line" style="--w:${k}" aria-hidden="true"></i></span>`;
    })
    .join(' ');
  return escapedText.slice(0, i) + html + escapedText.slice(i + p.length + punct.length);
}
