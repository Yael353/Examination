// CartContext.tsx
import React, { createContext, useContext, useState } from "react";
import { MenuItem } from "../types/types"; // Typ som kan innehålla id, name, price osv.
import { idFetch } from "../services/idFetch";

// Skapa en typ för CartContext
type CartContextType = {
  cartItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  decreaseQuantity: (id: number) => void;
  totalAmount: () => number;
  increaseQuantity: (id: number) => void;
  placeOrder: () => Promise<
    { id: string; eta: string; timestamp: string } | { error: string }
  >;
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
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: item.total - item.price,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const totalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.total || 0), 0);
  };

  const placeOrder = async (): Promise<
    { id: string; eta: string; timestamp: string } | { error: string }
  > => {
    if (cartItems.length > 0) {
      const itemIds = cartItems.flatMap((item) =>
        Array(item.quantity).fill(item.id)
      );
      console.log("itemids:", itemIds);
      const result = await idFetch(itemIds);
      if ("error" in result) {
        console.log("something went wrong with the order", result);
        return result;
      } else {
        console.log("order placed successfully!");
        setCartItems([]);
        return { id: result.id, eta: result.eta, timestamp: result.timestamp };
      }
    } else {
      console.log("empty cart = no order!");
      return { error: "Cart is empty" };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        totalAmount,
        decreaseQuantity,
        placeOrder,
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
