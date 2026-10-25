
import "./CartDrawer.css";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function CartDrawer({
  open,
  items,
  onClose,
  onRemove,
  onQuantityChange,
  onClear,
}) {
  if (!open) return null;

  const total = items.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onMouseDown={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>
            <p>{items.length} different product(s)</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span>🛒</span>
            <h3>Your cart is empty</h3>
            <p>Add products to get started.</p>
            <button onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>{currency.format(item.price)}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => onRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-total">
                <span>Total</span>
                <strong>{currency.format(total)}</strong>
              </div>
              <button className="clear-cart-button" onClick={onClear}>
                Clear cart
              </button>
              <p className="checkout-note">
                Demo project — checkout and payment are not enabled.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
