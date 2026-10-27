const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

export default function ProductCard({ product, onAdd }) {
  const image = product.image || product.imageUrl || product.thumbnail;

  const name = product.name || "Unnamed Product";
  const category = product.category || "General";
  const description =
    product.description || "A great addition to your everyday essentials.";

  const price = Number(product.price);
  const formattedPrice = Number.isFinite(price)
    ? currency.format(price)
    : "Price unavailable";

  return (
    <article className="overflow-hidden min-w-0 border border-[#e8e9e2] rounded-[18px] bg-white transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(31,55,37,0.08)]">
      <div className="h-[190px] max-[480px]:h-[145px] grid place-items-center overflow-hidden bg-[#f0f3ec] text-[3.5rem]">
        {image ? (
          <img
            className="w-full h-full object-cover"
            src={image}
            alt={name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <span aria-hidden="true">🛍️</span>
        )}
      </div>

      <div className="p-[17px] max-[480px]:p-3">
        <span className="block text-[#276749] text-[0.73rem] font-bold uppercase tracking-[0.8px]">
          {category}
        </span>

        <h3 className="my-2 font-['Manrope',sans-serif] font-bold text-base text-[#20251f]">
          {name}
        </h3>

        <p className="min-h-[40px] m-0 text-[#747a71] text-[0.84rem] leading-[1.55]">
          {description}
        </p>

        <div className="flex items-center max-[480px]:items-start max-[480px]:flex-col justify-between gap-2 mt-[17px]">
          <strong className="font-['Manrope',sans-serif] font-extrabold text-[1.05rem] text-[#20251f]">
            {formattedPrice}
          </strong>

          <button
            type="button"
            className="px-[13px] py-[9px] border-0 rounded-[9px] text-white bg-[#276749] text-[0.83rem] font-bold cursor-pointer transition-colors hover:bg-[#174b35]"
            onClick={() => onAdd(product)}
            aria-label={`Add ${name} to cart`}
            disabled={!Number.isFinite(price) || price < 0}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
