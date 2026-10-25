
import "./Navbar.css";

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="navbar">
      <a className="brand" href="/" aria-label="SmartCart home">
        <span className="brand-icon">S</span>
        <span>Smart<span className="brand-accent">Cart</span></span>
      </a>

      <span className="navbar-tagline">Smart shopping starts here.</span>

      <button className="cart-button" onClick={onCartClick}>
        <span aria-hidden="true">🛒</span>
        Cart
        <span className="cart-count">{cartCount}</span>
      </button>
    </header>
  );
}
