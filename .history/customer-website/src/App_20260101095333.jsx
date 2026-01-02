import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";


function App() {
  return (
    <Router>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Auth />} />

      </Routes>
    </Router>
  );
}

export default App;
