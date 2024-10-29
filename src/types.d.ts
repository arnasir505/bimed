export interface Product {
  id: string;
  name: string;
  img: string | null;
  oldPrice: number;
  newPrice: number | null;
  isPrescriptionRequired: boolean;
  whenToUse: string;
  country: string;
  manufacturer: string;
  brand: string;
  formOfRelease: string;
  isAvailable: boolean;
  datePublished: string;
  popularity: number;
  composition: string;
}

export interface News {
  id: string;
  title: string;
  img: string;
  date: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  favorites: Product[];
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
}
