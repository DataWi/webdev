import { Course } from "@/pages/courses";
import { createContext, useContext, useEffect, useState } from "react";
import CartItems from "../../assets/cart.json";

interface CartContextType {
  cartItems: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: number) => void;
  price: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  price: 0,
});

import { ReactNode } from "react";

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState([] as Course[]);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    setCartItems(CartItems);
    let curPrice = 0;
    CartItems.forEach((item) => {
      curPrice += item.price;
    });
    setPrice(curPrice);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const addToCart = (course: Course) => {
    const item = CartItems.find((itemn: Course) => itemn.id === course.id);
    if (item) return;
    setCartItems([...cartItems, course]);
    setPrice(price + course.price);
  };

  const removeFromCart = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setPrice(price - cartItems.find((item) => item.id === id)!.price);
    setCartItems(newCartItems);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, price }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
