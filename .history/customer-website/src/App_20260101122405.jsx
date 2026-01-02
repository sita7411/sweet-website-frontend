import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer/Footer";


function App() {
  return (
    <Router>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="products" element={<ProductPage />} />

      </Routes>
    </Router>
  );
}

export default App;
