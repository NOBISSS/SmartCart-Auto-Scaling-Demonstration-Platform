export default function SearchBar({ value, onChange }) {
  return (
    <label className="w-full max-w-[470px] min-h-[48px] flex items-center gap-3 px-[14px] border border-[#e8e9e2] rounded-[12px] bg-white text-[#747a71]">
      <span className="text-[1.5rem] select-none leading-none" aria-hidden="true">⌕</span>
      <input
        className="flex-1 w-full border-0 outline-none text-[#20251f] bg-transparent text-sm placeholder-[#747a71] focus:outline-none focus:ring-0"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />
      {value && (
        <button
          className="border-0 bg-transparent text-[1.3rem] text-[#747a71] hover:text-[#20251f] cursor-pointer leading-none p-1"
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </label>
  );
}
