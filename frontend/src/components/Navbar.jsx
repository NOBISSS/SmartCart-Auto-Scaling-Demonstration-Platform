export default function Navbar({ cartCount, onCartClick }) {
  return (
    <header className="h-[82px] max-[600px]:h-[70px] px-[7%] max-[600px]:px-[5%] flex items-center justify-between gap-6 bg-white/96 border-b border-[#e8e9e2] sticky top-0 z-20">
      <a className="inline-flex items-center gap-[11px] font-['Manrope',sans-serif] font-extrabold text-[1.35rem] tracking-[-0.7px] text-[#20251f]" href="/" aria-label="SmartCart home">
        <span className="grid place-items-center w-[38px] h-[38px] rounded-[12px] text-white bg-[#276749] text-base font-extrabold select-none">S</span>
        <span>Smart<span className="text-[#276749]">Cart</span></span>
      </a>

      <span className="text-[#747a71] text-[0.9rem] max-[600px]:hidden">Smart shopping starts here.</span>

      <button className="flex items-center gap-[10px] px-[15px] py-[10px] border border-[#e8e9e2] rounded-[12px] bg-white font-bold text-[#20251f] transition-colors duration-200 hover:bg-[#e8f2e9] cursor-pointer" onClick={onCartClick}>
        <span aria-hidden="true">🛒</span>
        Cart
        <span className="min-w-[23px] h-[23px] px-[6px] grid place-items-center rounded-full text-white bg-[#276749] text-[0.75rem] font-bold leading-none">{cartCount}</span>
      </button>
    </header>
  );
}
