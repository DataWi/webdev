import { Course } from "@/pages/courses";
import { createContext, useContext, useEffect, useState } from "react";
import CartItems from "../../assets/cart.json";

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

import { ReactNode } from "react";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState([] as Course[]);
  useEffect(() => {
    setCartItems(CartItems);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = (course: Course) => {
    console.log("Adding to cart", course);
    console.log(CartItems);
    const item = CartItems.find((itemn: Course) => itemn.id === course.id);
    if (item) return;
    setCartItems([...cartItems, course]);
    console.log("New List", cartItems);
  };

  const removeFromCart = (id: number) => {
    console.log("Removing from cart", id);
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    console.log("New List", newCartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
