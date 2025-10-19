export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface Filling extends Product {
  allergens?: string[];
}
