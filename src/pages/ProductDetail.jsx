import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productsSlice";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const cartItem = useSelector((state) =>
    state.cart.items.find(
      (item) => item.id === Number(id)
    )
  );

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  useEffect(() => {
    setSelectedImage(0);
  }, [id]);

  if (status === "loading") {
    return (
      <main className="page">
        <div className="container">
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="page">
        <div className="container">
          <h1>Something went wrong</h1>

          <p>{error}</p>

          <button
            className="add-button"
            onClick={() => dispatch(fetchProducts())}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page">
        <div className="container">
          <div className="not-found">
            <h1>Product not found</h1>

            <Link
              to="/"
              className="back-link"
            >
              ← Back to products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
    Fake Store API gives us only one image.

    We create four gallery entries from that image
    so the UI behaves like a multi-image product gallery.
  */

  const galleryImages = [
    {
      src: product.image,
      className: "gallery-normal",
    },
    {
      src: product.image,
      className: "gallery-zoom",
    },
    {
      src: product.image,
      className: "gallery-small",
    },
    {
      src: product.image,
      className: "gallery-normal",
    },
  ];

  const handleDecrease = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const handleIncrease = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );
  };

  const handleCartIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleCartDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <main className="page">
      <div className="container">

        <Link
          to="/"
          className="back-link"
        >
          ← Back to products
        </Link>

        <div className="product-detail">

          {/* =====================================
              LEFT SIDE — IMAGE GALLERY
          ===================================== */}

          <div className="product-gallery">

            {/* Main image */}

            <div className="product-detail-image">
              <img
                src={
                  galleryImages[selectedImage].src
                }
                alt={product.title}
                className={
                  galleryImages[selectedImage].className
                }
              />
            </div>

            {/* Image thumbnails */}

            <div className="product-thumbnails">

              {galleryImages.map(
                (image, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`product-thumbnail ${
                      selectedImage === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedImage(index)
                    }
                    aria-label={`View image ${
                      index + 1
                    }`}
                  >
                    <img
                      src={image.src}
                      alt=""
                    />
                  </button>
                )
              )}

            </div>
          </div>


          {/* =====================================
              RIGHT SIDE — PRODUCT INFORMATION
          ===================================== */}

          <div className="product-detail-info">

            <p className="product-detail-category">
              {product.category}
            </p>

            <h1>
              {product.title}
            </h1>


            {/* Rating */}

            <div className="detail-rating">

              <span className="stars">
                ★ ★ ★ ★ ☆
              </span>

              <strong>
                {product.rating.rate}
              </strong>

              <span>
                ({product.rating.count} reviews)
              </span>

            </div>


            {/* Price */}

            <div className="detail-price">
              ${product.price.toFixed(2)}
            </div>


            {/* Description */}

            <p className="detail-description">
              {product.description}
            </p>


            <div className="detail-divider" />


            {/* Quantity */}

            <div className="quantity-section">

              <span className="quantity-label">
                Quantity
              </span>

              {cartItem ? (
                <div className="quantity-control detail-quantity">

                  <button
                    type="button"
                    onClick={handleCartDecrease}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>
                    {cartItem.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleCartIncrease}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>
              ) : (
                <div className="quantity-control detail-quantity">

                  <button
                    type="button"
                    onClick={handleDecrease}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrease}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>

                </div>
              )}

            </div>


            {/* Cart buttons */}

            <div className="detail-actions">

              {!cartItem && (
                <button
                  className="detail-add-button"
                  onClick={handleAddToCart}
                >
                  🛒 Add to cart
                </button>
              )}

              {cartItem && (
                <Link
                  to="/cart"
                  className="detail-cart-button"
                >
                  Go to cart
                </Link>
              )}

            </div>


            {/* Shipping information */}

            <div className="product-benefits">

              <div className="product-benefit">
                <span className="benefit-icon">
                  🚚
                </span>

                <div>
                  <strong>
                    Free shipping
                  </strong>

                  <span>
                    on orders of $100+
                  </span>
                </div>
              </div>


              <div className="product-benefit">
                <span className="benefit-icon">
                  ↻
                </span>

                <div>
                  <strong>
                    30-day easy returns
                  </strong>

                  <span>
                    Shop with confidence
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetail;