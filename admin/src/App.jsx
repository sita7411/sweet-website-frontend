import { Routes, Route, Navigate } from "react-router-dom";
import ToastProvider from "./components/ToastProvider"; 

import AdminLayout from "./Layout/AdminLayout";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/product/AllProducts";
import AddProducts from "./pages/product/AddProducts";
import PopularProducts from "./pages/product/PopularProducts";
import BestSellerProducts from "./pages/product/BestSeller";
import AllOrders from "./pages/Orders/AllOrders";
import AllCustomers from "./pages/Customers/AllCustomers";
import AddCustomer from "./pages/Customers/AddCustomer";
import Inventory from "./pages/Inventory/Inventory";
import OfferPage from "./pages/Offers/OfferPage";
import Transaction from "./pages/Finance/Transaction";
import HeroBanner from "./pages/Settings/HeroBanner";
import General from "./pages/Settings/General";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <>
      {/* GLOBAL TOAST — works everywhere */}
      <ToastProvider />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin/profile" element={<MyProfile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notification" element={<NotificationsPage />} />
          <Route path="/products/all" element={<AllProducts />} />
          <Route path="/products/add" element={<AddProducts />} />
          <Route path="/products/popular" element={<PopularProducts />} />
          <Route path="/products/bestsell" element={<BestSellerProducts />} />
          <Route path="/orders/manage" element={<AllOrders />} />
          <Route path="/customers" element={<AllCustomers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/inventory/stock" element={<Inventory />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/finance/transactions" element={<Transaction />} />
          <Route path="/settings/baner" element={<HeroBanner />} />
          <Route path="/settings/general" element={<General />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
