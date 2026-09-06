import {
  createContext,
  useEffect,
  useState,
} from "react";

export const CartContext = createContext();

const API_URL =
  "http://127.0.0.1:5000";

const CartContextProvider = ({
  children,
}) => {

  // ======================================================
  // USER
  // ======================================================

  const getLoggedInUser = () => {

    const savedUser =
      localStorage.getItem(
        "loggedInUser"
      );

    if (!savedUser) {
      return null;
    }

    try {

      return JSON.parse(
        savedUser
      );

    } catch {

      return null;

    }
  };


  // ======================================================
  // USER STATE
  // ======================================================

  const [user, setUser] =
    useState(getLoggedInUser);


  // ======================================================
  // CART
  // ======================================================

  const [cartItems, setCartItems] =
    useState([]);


  // ======================================================
  // WISHLIST
  // ======================================================

  const [wishlistItems, setWishlistItems] =
    useState([]);


  // ======================================================
  // LOADING
  // ======================================================

  const [cartLoading, setCartLoading] =
    useState(false);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);


  // ======================================================
  // LOAD USER DATA
  // ======================================================

  const loadUserData = async (currentUser) => {

    if (!currentUser?.id) {

      setCartItems([]);

      setWishlistItems([]);

      return;

    }

    const userId =
      currentUser.id;


    // ====================================================
    // CART
    // ====================================================

    try {

      setCartLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/cart/${userId}`
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {

        setCartItems(
          data.cart || []
        );

      } else {

        setCartItems([]);

      }

    } catch (error) {

      console.error(
        "Cart loading error:",
        error
      );

      setCartItems([]);

    } finally {

      setCartLoading(false);

    }


    // ====================================================
    // WISHLIST
    // ====================================================

    try {

      setWishlistLoading(true);

      const response =
        await fetch(
          `${API_URL}/api/wishlist/${userId}`
        );

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {

        setWishlistItems(
          data.wishlist || []
        );

      } else {

        setWishlistItems([]);

      }

    } catch (error) {

      console.error(
        "Wishlist loading error:",
        error
      );

      setWishlistItems([]);

    } finally {

      setWishlistLoading(false);

    }

  };


  // ======================================================
  // AUTH CHANGE
  // ======================================================

  useEffect(() => {

    const handleAuthChanged = () => {

      const currentUser =
        getLoggedInUser();

      setUser(currentUser);

      loadUserData(
        currentUser
      );

    };


    // Initial load

    const currentUser =
      getLoggedInUser();

    setUser(currentUser);

    loadUserData(
      currentUser
    );


    window.addEventListener(
      "authChanged",
      handleAuthChanged
    );


    return () => {

      window.removeEventListener(
        "authChanged",
        handleAuthChanged
      );

    };

  }, []);


  // ======================================================
  // ADD TO CART
  // ======================================================

  const addToCart = async (
    product,
    qty = 1
  ) => {

    if (!user?.id) {

      return {
        success: false,
        loginRequired: true,
      };

    }

    try {

      const response =
        await fetch(
          `${API_URL}/api/cart/add`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              user_id: user.id,

              product_id:
                product.id,

              quantity: qty,
            }),
          }
        );


      const data =
        await response.json();


      if (
        !response.ok ||
        !data.success
      ) {

        return {
          success: false,
        };

      }


      // ==================================================
      // REMOVE PRODUCT FROM LOCAL WISHLIST
      // ==================================================

      setWishlistItems(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== product.id
          )
      );


      // ==================================================
      // RELOAD CART
      // ==================================================

      const cartResponse =
        await fetch(
          `${API_URL}/api/cart/${user.id}`
        );

      const cartData =
        await cartResponse.json();

      if (
        cartResponse.ok &&
        cartData.success
      ) {

        setCartItems(
          cartData.cart || []
        );

      }


      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Add to cart error:",
        error
      );

      return {
        success: false,
      };

    }

  };


  // ======================================================
  // REMOVE FROM CART
  // ======================================================

  const removeFromCart = async (
    id
  ) => {

    if (!user?.id) return;


    try {

      const response =
        await fetch(
          `${API_URL}/api/cart/remove/${user.id}/${id}`,
          {
            method: "DELETE",
          }
        );


      if (response.ok) {

        setCartItems(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !== id
            )
        );

      }

    } catch (error) {

      console.error(
        "Remove cart error:",
        error
      );

    }

  };


  // ======================================================
  // UPDATE QUANTITY
  // ======================================================

  const updateQuantity = async (
    id,
    qty
  ) => {

    if (!user?.id) return;

    if (qty < 1) return;


    try {

      const response =
        await fetch(
          `${API_URL}/api/cart/update/${user.id}/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              quantity: qty,
            }),
          }
        );


      if (response.ok) {

        setCartItems(
          (prev) =>
            prev.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity: qty,
                    }
                  : item
            )
        );

      }

    } catch (error) {

      console.error(
        "Update cart error:",
        error
      );

    }

  };


  // ======================================================
  // CLEAR CART
  // ======================================================

  const clearCart = async () => {

    if (!user?.id) return;


    try {

      const response =
        await fetch(
          `${API_URL}/api/cart/clear/${user.id}`,
          {
            method: "DELETE",
          }
        );


      if (response.ok) {

        setCartItems([]);

      }

    } catch (error) {

      console.error(
        "Clear cart error:",
        error
      );

    }

  };


  // ======================================================
  // ADD TO WISHLIST
  // ======================================================

  const addToWishlist = async (
    product
  ) => {

    if (!user?.id) {

      return {
        success: false,
        loginRequired: true,
      };

    }


    try {

      const response =
        await fetch(
          `${API_URL}/api/wishlist/add`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              user_id: user.id,

              product_id:
                product.id,
            }),
          }
        );


      const data =
        await response.json();


      if (
        !response.ok ||
        !data.success
      ) {

        return {
          success: false,
        };

      }


      // Add locally

      setWishlistItems(
        (prev) => {

          const exists =
            prev.some(
              (item) =>
                item.id ===
                product.id
            );

          if (exists) {
            return prev;
          }

          return [
            ...prev,
            product,
          ];

        }
      );


      return {
        success: true,
      };

    } catch (error) {

      console.error(
        "Add wishlist error:",
        error
      );

      return {
        success: false,
      };

    }

  };


  // ======================================================
  // REMOVE WISHLIST
  // ======================================================

  const removeFromWishlist = async (
    id
  ) => {

    if (!user?.id) return;


    try {

      const response =
        await fetch(
          `${API_URL}/api/wishlist/remove/${user.id}/${id}`,
          {
            method: "DELETE",
          }
        );


      if (response.ok) {

        setWishlistItems(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !== id
            )
        );

      }

    } catch (error) {

      console.error(
        "Remove wishlist error:",
        error
      );

    }

  };


  // ======================================================
  // CLEAR WISHLIST
  // ======================================================

  const clearWishlist = async () => {

    if (!user?.id) return;


    try {

      const response =
        await fetch(
          `${API_URL}/api/wishlist/clear/${user.id}`,
          {
            method: "DELETE",
          }
        );


      if (response.ok) {

        setWishlistItems([]);

      }

    } catch (error) {

      console.error(
        "Clear wishlist error:",
        error
      );

    }

  };


  // ======================================================
  // CHECK WISHLIST
  // ======================================================

  const isInWishlist = (
    productId
  ) => {

    return wishlistItems.some(
      (item) =>
        item.id === productId
    );

  };


  // ======================================================
  // TOTAL ITEMS
  // ======================================================

  const totalItems =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );


  // ======================================================
  // TOTAL AMOUNT
  // ======================================================

  const totalAmount =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(
          item.new_price || 0
        ) *
          Number(
            item.quantity || 0
          ),
      0
    );


  // ======================================================
  // PROVIDER
  // ======================================================

  return (
    <CartContext.Provider
      value={{

        user,

        cartItems,

        wishlistItems,

        cartLoading,

        wishlistLoading,

        addToCart,

        removeFromCart,

        updateQuantity,

        clearCart,

        addToWishlist,

        removeFromWishlist,

        clearWishlist,

        isInWishlist,

        totalItems,

        totalAmount,

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;