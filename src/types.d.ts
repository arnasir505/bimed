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

export type CartItem = { product: Product; quantity: number };

export interface News {
  id: string;
  title: string;
  img: string;
  date: string;
  text: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  favorites: Product[];
}

export interface RegisterFormMutation {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phone: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
}

export interface Branch {
  id: string;
  img: string;
  title: string;
  address: string;
  workingHours: string;
  isOpen: boolean;
  phoneNumbers: string[];
}
