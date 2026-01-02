import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <Router>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="products" element={<AuthPage />} />

      </Routes>
    </Router>
  );
}

export default App;
