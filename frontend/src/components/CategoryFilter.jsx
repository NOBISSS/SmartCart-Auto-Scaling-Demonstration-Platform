export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-[10px] my-5 mb-[27px]" aria-label="Filter by category">
      {categories.map((category) => {
        const isActive = selected === category;
        return (
          <button
            key={category}
            className={`px-4 py-[9px] border rounded-full text-[0.85rem] font-semibold cursor-pointer transition-colors duration-150 ${
              isActive
                ? "border-[#276749] bg-[#276749] text-white"
                : "border-[#e8e9e2] bg-white text-[#596159] hover:border-[#276749] hover:bg-[#276749] hover:text-white"
            }`}
            onClick={() => onSelect(category)}
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
