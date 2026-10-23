import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="page">
      <div className="container">
        <div className="not-found">
          <p className="eyebrow">404 Error</p>

          <h1>Page not found</h1>

          <p>
            The page you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="continue-shopping-button"
          >
            Back to products
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;