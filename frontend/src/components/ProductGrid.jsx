import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <div className="py-[55px] px-5 text-center text-[#747a71]">
        <span className="text-[2.5rem] block mb-2">🔎</span>
        <h3 className="text-lg font-bold font-['Manrope',sans-serif] text-[#20251f] mb-1">No products found</h3>
        <p className="text-sm text-[#747a71] m-0">Try another search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 max-[1050px]:grid-cols-3 max-[750px]:grid-cols-2 gap-[22px] max-[750px]:gap-[14px] max-[420px]:gap-[10px]">
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
