import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/product/AllProducts";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/products/add" element={<h1>Add Product</h1>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
