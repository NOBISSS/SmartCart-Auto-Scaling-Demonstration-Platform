
export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="category-list" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-chip ${selected === category ? "active" : ""}`}
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
