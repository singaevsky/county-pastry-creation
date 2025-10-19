export interface CakeSize {
  id: string;
  name: string;
  diameter: number;
  weight: number;
  servings: number;
  basePrice: number;
}

export interface CakeLayer {
  id: string;
  name: string;
  description: string;
  type: 'biscuit' | 'meringue' | 'shortcrust';
  price: number;
  allergens?: string[];
}

export interface CakeFilling {
  id: string;
  name: string;
  description: string;
  type: 'cream' | 'jam' | 'mousse' | 'custard';
  price: number;
  allergens?: string[];
}

export interface CakeDecoration {
  id: string;
  name: string;
  description: string;
  type: 'topping' | 'fruit' | 'chocolate' | 'fondant';
  price: number;
  allergens?: string[];
}

export interface CakeCustomization {
  sizeId: string;
  layers: Array<{
    layerId: string;
    quantity: number;
  }>;
  fillings: Array<{
    fillingId: string;
    quantity: number;
  }>;
  decorations: Array<{
    decorationId: string;
    quantity: number;
  }>;
  designImage?: string;
  specialInstructions?: string;
}
