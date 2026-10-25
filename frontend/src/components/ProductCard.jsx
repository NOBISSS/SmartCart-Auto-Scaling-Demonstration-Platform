
import "./ProductCard.css";

const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function ProductCard({ product, onAdd }) {
  const image = product.image || product.imageUrl || product.thumbnail;

  return (
    <article className="product-card">
      <div className="product-image">
        {image ? (
          <img src={image} alt={product.name} loading="lazy" />
        ) : (
          <span aria-hidden="true">🛍️</span>
        )}
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p>{product.description || "A great addition to your everyday essentials."}</p>

        <div className="product-card-bottom">
          <strong>{currency.format(product.price)}</strong>
          <button onClick={() => onAdd(product)}>+ Add</button>
        </div>
      </div>
    </article>
  );
}
