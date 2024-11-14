// CartContext.tsx
import React, { createContext, useContext, useState } from "react";
import { MenuItem } from "../types/types"; // Typ som kan innehålla id, name, price osv.

// Skapa en typ för CartContext
type CartContextType = {
  cartItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  decreaseQuantity: (id: number) => void;
  totalAmount: () => number;
  increaseQuantity: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + 1,
                total: (cartItem.total || cartItem.price) + cartItem.price, // Lägg till total
              }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        { ...item, quantity: 1, total: item.price }, // Initialisera total när varan läggs till
      ]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: item.total + item.price, // Uppdatera total när kvantitet ökas
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  total: item.total - item.price, // Minska total när kvantitet minskas
                }
              : item
          )
          .filter((item) => item.quantity > 0) // Ta bort artiklar med 0 kvantitet
    );
  };
  const totalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.total || 0), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        totalAmount,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart måste användas inom en CartProvider");
  }
  return context;
};
