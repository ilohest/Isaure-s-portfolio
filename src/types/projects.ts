export interface BaseProject {
  id: number;
  title: string;
  year: string;
  placeholder: string;
  projectLink: string;
}

export interface HomeProject extends BaseProject {
  src?: string;
}

export interface WebDevProject extends BaseProject {
  order: number;
  src: string;
}

export interface BrandingProject extends BaseProject {
  order: number;
}
