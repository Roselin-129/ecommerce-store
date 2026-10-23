import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productsSlice";
import ProductGrid from "../components/ProductGrid";

function ProductList() {
  const dispatch = useDispatch();

  const {
    items,
    status,
    error,
  } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [sortOrder, setSortOrder] =
    useState("default");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const categories = useMemo(() => {
    return [
      "all",
      ...new Set(
        items.map((product) => product.category)
      ),
    ];
  }, [items]);

  const filteredProducts = useMemo(() => {
    let result = [...items];

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) =>
          product.category === selectedCategory
      );
    }

    if (sortOrder === "low-high") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOrder === "high-low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    items,
    selectedCategory,
    sortOrder,
  ]);

  if (status === "loading") {
    return (
      <main className="page">
        <div className="container">
          <p className="loading-message">
            Loading products...
          </p>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="page">
        <div className="container">
          <div className="error-state">
            <h1>Something went wrong</h1>

            <p>{error}</p>

            <button
              className="add-button"
              onClick={() =>
                dispatch(fetchProducts())
              }
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        <div className="page-heading">
          <div>
            <h1>All products</h1>

            <p className="page-description">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="sort-wrapper">
            <span>Sort by</span>

            <select
              value={sortOrder}
              onChange={(event) =>
                setSortOrder(
                  event.target.value
                )
              }
              className="sort-select"
            >
              <option value="default">
                Featured
              </option>

              <option value="low-high">
                Price: Low to High
              </option>

              <option value="high-low">
                Price: High to Low
              </option>
            </select>
          </div>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-chip ${
                selectedCategory === category
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category === "all"
                ? "All"
                : category}
            </button>
          ))}
        </div>

        <ProductGrid
          products={filteredProducts}
        />

      </div>
    </main>
  );
}

export default ProductList;