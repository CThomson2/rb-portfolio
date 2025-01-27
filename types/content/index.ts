export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface NavItem {
  name: string;
  links: {
    id: number;
    name: string;
    link: string;
  }[];
}

export interface ProductInfo {
  title: string;
  description: string;
  img: string;
}

export interface DashboardItem {
  id: number;
  description: string;
  link: string;
  icon: React.ElementType;
}

export interface UserDashboard {
  id: number;
  title: string;
  content: DashboardItem[];
  thumbnail: string;
  colors?: number[][];
  bgColor: string;
  animationSpeed: number;
  dotSize?: number;
}

export type WorkExperience = {
  id: number;
  title: string;
  description: string;
  className: string;
  thumbnail: string;
  content: DashboardItem[];
};

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

export interface GoodsOrder {
  id: number;
  material: string;
  supplier: string;
  className: string;
  imgClassName?: string;
  titleClassName?: string;
  img?: string;
  spareImg?: string;
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

export type SocialMedia = {
  id: number;
  img: string;
};
