export interface BaseProject {
  id: number;
  title: string;
  year: string;
  placeholder: string;
  projectLink: string;
}

export interface HomeProject extends BaseProject {
  src?: string;
  srcAlt?: string;
}

export interface WebDevProject extends BaseProject {
  order: number;
  src: string;
  srcAlt?: string;
}

export interface BrandingProject extends BaseProject {
  order: number;
}
