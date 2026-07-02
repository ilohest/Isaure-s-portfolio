import allProjects from './all-projects';

/**
 * Secteurs de projets qui ne figurent pas dans les listes de données
 * (pas affichés dans la grille "work" mais bien réalisés) :
 * Didacmania → jouets, Creyda → yoga.
 */
const extraSectors: string[] = ['Toys', 'Yoga'];

/**
 * Liste unique des secteurs d'activité, dérivée des fichiers de données projets
 * + des secteurs supplémentaires ci-dessus.
 * Source unique : pour ajouter un secteur, renseigner le champ `sector`
 * sur le projet concerné (web-dev-projects.ts / branding-projects.ts),
 * ou l'ajouter à `extraSectors` s'il n'a pas d'entrée dans ces listes.
 */
const sectors: string[] = [
  ...new Set([
    ...allProjects.map((project) => project.sector?.trim()),
    ...extraSectors,
  ].filter((sector): sector is string => Boolean(sector))),
].sort((a, b) => a.localeCompare(b));

export default sectors;
