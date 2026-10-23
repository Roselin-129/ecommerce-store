import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
          path="/"
          element={<ProductList />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;