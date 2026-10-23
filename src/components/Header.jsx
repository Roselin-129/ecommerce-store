import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectTotalItems } from "../selectors/cartSelectors";

function Header() {
  const totalItems = useSelector(selectTotalItems);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">
          ShopKart
        </Link>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search products"
            aria-label="Search products"
          />
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">
            Products
          </Link>

          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            <span>Cart</span>

            <span className="cart-badge">
              {totalItems}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;