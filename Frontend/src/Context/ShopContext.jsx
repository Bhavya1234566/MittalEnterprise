import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  // LocalStorage se cart load karo
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Cart update hote hi LocalStorage me save karo
  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Add To Cart
  const addToCart = (product, qty = 1) => {

    setCartItems((prev) => {

      const exist = prev.find(
        (item) => item.id === product.id
      );

      if (exist) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + qty,
              }
            : item
        );

      }

      return [
        ...prev,
        {
          ...product,
          quantity: qty,
        },
      ];

    });

  };

  // Remove Item
  const removeFromCart = (id) => {

    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

  };

  // Update Quantity
  const updateQuantity = (id, qty) => {

    if (qty < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: qty,
            }
          : item
      )
    );

  };

  // Empty Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Products
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total Price
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.new_price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;