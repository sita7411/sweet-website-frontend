import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";

function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/products" element={<h1>Products</h1>} />
        <Route path="/products/add" element={<h1>Add Product</h1>} />
        <Route path="/orders" element={<h1>Orders</h1>} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
