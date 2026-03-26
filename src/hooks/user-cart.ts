// user-cart.ts
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  selected?: boolean; // Added this property
  options?: {
    color?: string;
    size?: string;
  };
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  const saveCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cart.findIndex(
      (i) => 
        i.productId === item.productId && 
        i.options?.color === item.options?.color && 
        i.options?.size === item.options?.size
    );

    let updatedCart = [...cart];

    if (existingItemIndex > -1) {
      const newQty = updatedCart[existingItemIndex].quantity + item.quantity;
      updatedCart[existingItemIndex] = { ...updatedCart[existingItemIndex], quantity: newQty };
      toast.success(`Updated quantity for ${item.title}`);
    } else {
      // Default new items to be selected
      updatedCart.push({ ...item, selected: true });
      toast.success(`${item.title} added to cart`);
    }

    saveCart(updatedCart);
  };

  // Added toggleSelection function
  const toggleSelection = (productId: string, color?: string, size?: string) => {
    const updatedCart = cart.map((item) =>
      item.productId === productId && 
      item.options?.color === color && 
      item.options?.size === size
        ? { ...item, selected: !item.selected } 
        : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    const updatedCart = cart.filter(
      (item) => 
        !(item.productId === productId && 
          item.options?.color === color && 
          item.options?.size === size)
    );
    saveCart(updatedCart);
    toast.info("Item removed from cart");
  };

  const updateQuantity = (productId: string, newQty: number, color?: string, size?: string) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item.productId === productId && 
      item.options?.color === color && 
      item.options?.size === size
        ? { ...item, quantity: newQty } 
        : item
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return { cart, addToCart, removeFromCart, updateQuantity, toggleSelection, clearCart };
};