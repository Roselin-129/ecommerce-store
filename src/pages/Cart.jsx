import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

import {
  selectCartItems,
  selectTotalPrice,
} from "../selectors/cartSelectors";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectTotalPrice);

  const shipping = subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h1>Your cart is empty</h1>

            <p>
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              to="/"
              className="continue-shopping-button"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container">

        <div className="cart-heading">
          <div>
            <p className="eyebrow">Shopping bag</p>

            <h1>Your Cart</h1>

            <p className="page-description">
              Review your items before checkout.
            </p>
          </div>

          <button
            className="clear-cart-button"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </div>

        <div className="cart-layout">

          {/* Cart items */}
          <section className="cart-items">

            {cartItems.map((item) => {
              const lineTotal =
                item.price * item.quantity;

              return (
                <article
                  key={item.id}
                  className="cart-item"
                >
                  <Link
                    to={`/product/${item.id}`}
                    className="cart-item-image"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                    />
                  </Link>

                  <div className="cart-item-info">

                    <p className="cart-item-category">
                      {item.category}
                    </p>

                    <Link
                      to={`/product/${item.id}`}
                    >
                      <h2>{item.title}</h2>
                    </Link>

                    <p className="cart-item-price">
                      ${item.price.toFixed(2)}
                    </p>

                    <div className="cart-item-actions">

                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(item.id)
                            )
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(item.id)
                            )
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="remove-button"
                        onClick={() =>
                          dispatch(
                            removeFromCart(item.id)
                          )
                        }
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                  <strong className="cart-line-total">
                    ${lineTotal.toFixed(2)}
                  </strong>
                </article>
              );
            })}

          </section>

          {/* Order summary */}
          <aside className="order-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <strong>
                ${subtotal.toFixed(2)}
              </strong>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <strong>
                {shipping === 0
                  ? "FREE"
                  : `$${shipping.toFixed(2)}`}
              </strong>
            </div>

            {shipping === 0 && (
              <p className="free-shipping-message">
                You qualify for free shipping!
              </p>
            )}

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ${total.toFixed(2)}
              </strong>
            </div>

            <button className="checkout-button">
              Proceed to checkout
            </button>

            <Link
              to="/"
              className="continue-shopping-link"
            >
              ← Continue shopping
            </Link>

          </aside>

        </div>
      </div>
    </main>
  );
}

export default Cart;