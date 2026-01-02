import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AuthPage from "./pages/AuthPage";
import Wishlist from "./pages/AuthPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages that use Navbar/Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>

        {/* Page without Navbar/Footer */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
