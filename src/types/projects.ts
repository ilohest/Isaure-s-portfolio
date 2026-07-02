export interface BaseProject {
  id: number;
  title: string;
  year: string;
  placeholder: string;
  projectLink: string;
  /** Secteur d'activité du client — source unique réutilisée sur les pages projet
   *  et la liste des secteurs de la page d'accueil. */
  sector?: string;
  introPlaceholder?: string;
  introDurationMs?: number;
}

export interface HomeProject extends BaseProject {
  order?: number;
  src?: string;
  srcAlt?: string;
}

export interface WebDevProject extends BaseProject {
  order: number;
  src?: string;
  srcAlt?: string;
}

export interface BrandingProject extends BaseProject {
  order: number;
}
