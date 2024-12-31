export interface NavItem {
  name: string;
  link: string;
}

export interface GradeInfo {
  id: number;
  title: string;
  acronym: string;
  description: string;
  img: string;
  colors?: number[][];
  bgColor?: string;
  animationSpeed: number;
  dotSize?: number;
}

// Iniital Types

export interface GridItem {
  id: number;
  title: string;
  description: string;
  className: string;
  imgClassName?: string;
  titleClassName?: string;
  img?: string;
  spareImg?: string;
}

export type Project = {
  id: number;
  title: string;
  description: string;
  img: string;
  iconLists: string[];
  link: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export type Company = {
  id: number;
  name: string;
  img: string;
  nameImg: string;
};

export type WorkExperience = {
  id: number;
  title: string;
  description: string;
  className: string;
  thumbnail: string;
};

export type SocialMedia = {
  id: number;
  img: string;
};
