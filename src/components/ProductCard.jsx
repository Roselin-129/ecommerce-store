import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from "../features/cart/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
      </Link>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <Link to={`/product/${product.id}`}>
          <h2 className="product-title">{product.title}</h2>
        </Link>

        <div className="product-rating">
          <span>★</span>
          {product.rating.rate}
          <span className="rating-count">
            ({product.rating.count})
          </span>
        </div>

        <div className="product-card-bottom">
          <strong className="product-price">
            ${product.price.toFixed(2)}
          </strong>

          {quantity === 0 ? (
            <button
              className="add-button"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          ) : (
            <div className="quantity-control">
              <button
                onClick={() =>
                  dispatch(decreaseQuantity(product.id))
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  dispatch(increaseQuantity(product.id))
                }
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;