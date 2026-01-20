import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";          // ← ADD THIS LINE if missing
import { ShopProvider } from "./context/ShopContext";     // ← make sure this is imported

import Layout from "./Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AuthPage from "./pages/AuthPage";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompleted from "./pages/OrderCompleted";
import MyOrders from "./pages/MyOrders";
import ProductPage from "./pages/ProductPage";
import MyAccount from "./pages/MyAccount";
import ContactUs from "./components/ContactUs/ContactUs";
import OurStory from "./pages/OurStory";

function App() {
  const { user, loading } = useAuth();   // ← ADD or keep this line

  // Prevent rendering until we know if user is logged in
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <ShopProvider userId={user?._id}>    
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/ordercomplete" element={<OrderCompleted />} />
            <Route path="/myorder" element={<MyOrders />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<OurStory />} />
          </Route>

          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </ShopProvider>
  );
}

export default App;