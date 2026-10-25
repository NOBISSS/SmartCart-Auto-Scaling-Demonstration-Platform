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
    <div className="fixed inset-0 z-[100] flex justify-end bg-[rgba(19,29,22,0.48)] animate-[fade-in_0.18s_ease]" onMouseDown={onClose}>
      <aside
        className="w-[min(440px,100%)] h-full flex flex-col p-[26px] bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.1)] animate-[slide-in_0.22s_ease]"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 pb-5 border-b border-[#e8e9e2]">
          <div>
            <h2 className="m-0 font-['Manrope',sans-serif] font-extrabold text-[1.5rem] text-[#20251f]">Your Cart</h2>
            <p className="mt-[5px] mb-0 text-[#747a71] text-[0.85rem]">{items.length} different product(s)</p>
          </div>
          <button className="w-[38px] h-[38px] flex items-center justify-center border border-[#e8e9e2] rounded-[10px] bg-white text-[1.5rem] leading-none text-[#20251f] cursor-pointer hover:bg-[#f8f9f6]" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 grid place-content-center justify-items-center text-center">
            <span className="text-[3rem]">🛒</span>
            <h3 className="font-['Manrope',sans-serif] font-bold text-lg text-[#20251f] mt-2 mb-1">Your cart is empty</h3>
            <p className="text-[#747a71] m-0 text-sm">Add products to get started.</p>
            <button className="mt-3 px-4 py-3 border-0 rounded-[10px] text-white bg-[#276749] font-bold text-sm cursor-pointer hover:bg-[#174b35] transition-colors" onClick={onClose}>Continue shopping</button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              {items.map((item) => (
                <div className="flex justify-between items-center gap-3 py-5 border-b border-[#e8e9e2]" key={item._id}>
                  <div>
                    <h3 className="m-0 font-['Manrope',sans-serif] font-bold text-[0.98rem] text-[#20251f]">{item.name}</h3>
                    <p className="mt-[5px] mb-0 text-[#747a71] text-[0.85rem]">{currency.format(item.price)}</p>
                    <div className="inline-flex items-center gap-[13px] mt-3">
                      <button
                        className="w-[29px] h-[29px] flex items-center justify-center border border-[#e8e9e2] rounded-[8px] bg-[#f8f9f6] text-sm font-bold text-[#20251f] cursor-pointer hover:bg-[#e8f2e9] transition-colors"
                        onClick={() => onQuantityChange(item._id, item.quantity - 1)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-[#20251f]">{item.quantity}</span>
                      <button
                        className="w-[29px] h-[29px] flex items-center justify-center border border-[#e8e9e2] rounded-[8px] bg-[#f8f9f6] text-sm font-bold text-[#20251f] cursor-pointer hover:bg-[#e8f2e9] transition-colors"
                        onClick={() => onQuantityChange(item._id, item.quantity + 1)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="border-0 bg-transparent text-[#a33d3d] text-[0.8rem] font-medium cursor-pointer hover:underline"
                    onClick={() => onRemove(item._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-[#e8e9e2]">
              <div className="flex justify-between items-center text-[1.1rem] text-[#20251f]">
                <span>Total</span>
                <strong className="font-['Manrope',sans-serif] font-extrabold text-[#20251f]">{currency.format(total)}</strong>
              </div>
              <button className="w-full mt-[18px] p-[13px] border border-[#e8e9e2] rounded-[10px] bg-white font-bold text-[#20251f] cursor-pointer hover:bg-[#f8f9f6] transition-colors" onClick={onClear}>
                Clear cart
              </button>
              <p className="mt-3 text-[#747a71] text-[0.76rem] text-center leading-[1.5]">
                Demo project — checkout and payment are not enabled.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
