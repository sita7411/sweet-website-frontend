import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/product/AllProducts";
import AddProducts from "./pages/product/AddProducts";
import PopularProducts from "./pages/product/PopularProducts";
import BestSellerProducts from "./pages/product/BestSeller";
import AllOrders from "./pages/Orders/AllOrders";
import AllCustomers from "./pages/Customers/AllCustomers";
import Inventory from "./pages/Inventory/Inventory";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products/all" element={<AllProducts />} />
        <Route path="/products/add" element={<AddProducts />} />
        <Route path="/products/popular" element={<PopularProducts />} />
        <Route path="/products/bestsell" element={<BestSellerProducts />} />
        <Route path="/orders/manage" element={<AllOrders />} />
        <Route path="/customers" element={<AllCustomers />} />
        <Route path="/inventory/stock" element={<Inventory />} />

      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
