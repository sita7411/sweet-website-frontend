import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AuthPage from "./pages/AuthPage";
import Wishlist from "./pages/Wishlist";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompleted from "./pages/OrderCompleted";
import MyOrders from "./pages/MyOrders";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages that use Navbar/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/ordercomplete" element={<OrderCompleted />} />
          <Route path="/myorder" element={<MyOrders />} />

        </Route>

        {/* Page without Navbar/Footer */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
