
import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <span>🔎</span>
        <h3>No products found</h3>
        <p>Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
