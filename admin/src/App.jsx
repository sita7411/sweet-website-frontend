import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import AllProducts from "./pages/product/AllProducts";
import AddProducts from "./pages/product/AddProducts";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products/all" element={<AllProducts />} />
        <Route path="/products/add" element={<AddProducts />} />
        <Route path="/orders" element={<h1>Orders</h1>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
