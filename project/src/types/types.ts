export type MenuItem = {
  id: number;
  name: string;
  description: string;
  ingredients?: string[];
  price: number;
  quantity: number;
  total: number;
  type: "wonton" | "dip" | "drink";
};

// types.ts
export interface TypedCartItem {
  id: number;
  name: string;
  price: number;
  total: number;
  quantity: number;
}

export type CartItemProps = {
  id: number;
  name: string;
  total: number;
  quantity: number;
  price: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
};
