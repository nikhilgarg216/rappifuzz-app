import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./component/Signup.jsx";
import Login from "./component/Login.jsx";
import Product from "./component/Product.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  );
}

export default App;
