import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ShopContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

export const ShopProvider = ({ children, userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    console.log("[ShopProvider] userId =", userId || "MISSING — login required");
  }, [userId]);

  // ───────────── CART FUNCTIONS ─────────────

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_BASE}/api/cart/${userId}`, {
        withCredentials: true,
      });
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      toast.error("Failed to load cart. Please try again.");
    }
  };

  const addToCart = async (product, variant, qty = 1) => {
    if (!userId) {
      toast.warn("Please log in to add items to your cart");
      return;
    }

    if (!product?._id || !variant?.weight) {
      toast.error("Invalid product or variant selected");
      return;
    }

    try {
      await axios.post(
        `${API_BASE}/api/cart`,
        {
          userId,
          productId: product._id,
          weight: variant.weight,
          qty,
        },
        { withCredentials: true }
      );
      toast.success(`${product.name || "Item"} (${variant.weight}) added to cart!`);
      await fetchCart();
    } catch (err) {
      console.error("Add to cart failed:", err);
      const msg = err.response?.data?.message || "Failed to add item to cart";
      toast.error(msg);
    }
  };

  const removeFromCart = async (productId, weight) => {
    const item = cartItems.find((i) => i.productId === productId && i.weight === weight);
    if (!item) return;

    // Optimistic UI update (optional but recommended)
    setCartItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.weight === weight))
    );

    try {
      await axios.delete(`${API_BASE}/api/cart/${item._id}`, {
        withCredentials: true,
      });
      toast.success("Item removed from cart");
      // No need to call fetchCart() here anymore because of optimistic update
      // But if you prefer to always refetch: await fetchCart();
    } catch (err) {
      console.error("Remove from cart failed:", err);
      toast.error("Failed to remove item. Cart refreshed.");
      await fetchCart(); // recover correct state
    }
  };

  const updateQty = async (productId, weight, qty) => {
    const item = cartItems.find((i) => i.productId === productId && i.weight === weight);
    if (!item) return;

    if (qty <= 0) {
      await removeFromCart(productId, weight);
      return;
    }

    try {
      await axios.put(
        `${API_BASE}/api/cart/${item._id}`,
        { qty },
        { withCredentials: true }
      );
      toast.success(`Quantity updated to ${qty}`);
      // Optional: await fetchCart();  ← if you want to refetch
    } catch (err) {
      console.error("Update quantity failed:", err);
      toast.error("Failed to update quantity. Cart refreshed.");
      await fetchCart();
    }
  };

  const clearCart = async () => {
    if (!userId) return;

    try {
      await axios.delete(`${API_BASE}/api/cart/clear/${userId}`, {
        withCredentials: true,
      });
      setCartItems([]);
      toast.success("Cart has been cleared");
    } catch (err) {
      console.error("Clear cart failed:", err);
      toast.error("Failed to clear cart. Please try again.");
      await fetchCart(); // recover
    }
  };

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + (item.price || item.sellingPrice || 0) * (item.qty || 0), 0);

  const getCartCount = () =>
    cartItems.reduce((count, item) => count + (item.qty || 0), 0);

  // ───────────── WISHLIST FUNCTIONS ─────────────
  // (unchanged — keeping existing toasts)

  const fetchWishlist = async () => {
    if (!userId) {
      setWishlistItems([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE}/api/wishlist`, {
        withCredentials: true,
      });

      let data = res.data;

      if (Array.isArray(data)) {
        // good
      } else if (data && Array.isArray(data.data)) {
        data = data.data;
      } else if (data && Array.isArray(data.wishlist)) {
        data = data.wishlist;
      } else {
        data = [];
      }

      setWishlistItems(data);
    } catch (err) {
      console.error("Fetch wishlist failed:", err);
      setWishlistItems([]);
      if (err.response?.status === 401 || err.response?.status === 403) {
        toast.warn("Please log in to view your wishlist");
      } else {
        toast.error("Failed to load wishlist");
      }
    }
  };

  const toggleWishlist = async (product, selectedWeight) => {
    if (!userId) {
      toast.warn("Please log in to manage your wishlist");
      return;
    }

    if (!product?._id) {
      toast.error("Invalid product");
      return;
    }

    const weightToSend = selectedWeight || product.weights?.[0]?.weight || null;

    if (!weightToSend) {
      toast.error("No weight variant available");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE}/api/wishlist`,
        {
          productId: product._id,
          selectedWeight: weightToSend,
        },
        { withCredentials: true }
      );

      if (res.data?.action === "added") {
        toast.success(`Added to wishlist (${weightToSend})`);
      } else if (res.data?.action === "removed") {
        toast.info("Removed from wishlist");
      }

      await fetchWishlist();
    } catch (err) {
      console.error("Toggle wishlist failed:", err);
      toast.error(err.response?.data?.message || "Failed to update wishlist");
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    if (!wishlistItemId) return;

    try {
      await axios.delete(`${API_BASE}/api/wishlist/${wishlistItemId}`, {
        withCredentials: true,
      });
      toast.info("Item removed from wishlist");
      await fetchWishlist();
    } catch (err) {
      console.error("Remove from wishlist failed:", err);
      toast.error("Failed to remove item from wishlist");
    }
  };

  const clearWishlist = async () => {
    if (!userId) return;
    try {
      await axios.delete(`${API_BASE}/api/wishlist/clear`, {
        withCredentials: true,
      });
      setWishlistItems([]);
      toast.success("Wishlist has been cleared");
    } catch (err) {
      console.error("Clear wishlist failed:", err);
      toast.error("Failed to clear wishlist");
    }
  };

  const isInWishlist = (productId, selectedWeight = null) => {
    if (!Array.isArray(wishlistItems)) return false;

    if (selectedWeight) {
      return wishlistItems.some(
        (i) => i.productId === productId && i.selectedWeight === selectedWeight
      );
    }

    return wishlistItems.some((i) => i.productId === productId);
  };

  const getWishlistCount = () => {
    return Array.isArray(wishlistItems) ? wishlistItems.length : 0;
  };

  // ───────────── INITIAL FETCH ─────────────
  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchWishlist();
    } else {
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [userId]);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        fetchCart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        getCartTotal,
        getCartCount,

        wishlistItems,
        fetchWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);