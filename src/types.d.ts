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
}
