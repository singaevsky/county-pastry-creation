export enum ProductType {
  TORTE = 'torte',
  BENTO_TORTE = 'bento_torte',
  PIE_BERRY = 'pie_berry',
  PIE_MEAT = 'pie_meat',
  PIE_LENTEN = 'pie_lenten',
  ROULETTE = 'roulette',
  PASTRY = 'pastry',
  CUPCAKE = 'cupcake',
  OTHER = 'other',
}

export interface Filling {
  id: number;
  name: string;
  cost: number;
}

export interface Product {
  id: number;
  type: ProductType;
  maxTiers: number;
  maxFillings: number;
  // Дополнительные правила (e.g., allowed colors)
}
