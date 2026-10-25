
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  selectCartItems,
} from "../features/cart/cartSlice";
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsSource,
  selectProductsError,
} from "../features/products/productsSlice";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import ProductGrid from "../components/ProductGrid";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const source = useSelector(selectProductsSource);
  const error = useSelector(selectProductsError);
  const cartItems = useSelector(selectCartItems);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
  if (status === "idle") dispatch(fetchProducts());
}, [dispatch, status]); 

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category).filter(Boolean))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesSearch = [
        product.name,
        product.description,
        product.category,
      ].some((value) => String(value || "").toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">YOUR EVERYDAY MARKETPLACE</span>
          <h1>Find your next <span>favourite.</span></h1>
          <p>Discover useful essentials, fresh finds, and everyday favourites—all in one place.</p>
          <a className="hero-cta" href="#products">Explore products <span>→</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-orbit orbit-one" />
          <span className="hero-orbit orbit-two" />
          <span className="hero-bag">🛍️</span>
          <span className="hero-spark spark-one">✦</span>
          <span className="hero-spark spark-two">✳</span>
        </div>
      </section>

      <section className="shop-section" id="products">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">CURATED FOR YOU</span>
            <h2>Explore the collection</h2>
            <p>Everyday products, thoughtfully picked.</p>
          </div>
          <span className="product-count">{filteredProducts.length} products</span>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        {source === "demo" && status === "succeeded" && (
          <p className="data-notice">
            Showing demo products{error ? ` — ${error}` : ". Connect the backend to load your live catalogue."}
          </p>
        )}

        {status === "loading" ? (
          <div className="loading-state">Loading your products…</div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAdd={(product) => dispatch(addToCart(product))}
          />
        )}
      </section>

      <section className="trust-strip">
        <div><span>⚡</span><strong>Fast experience</strong><p>Built for a responsive shopping journey</p></div>
        <div><span>🔒</span><strong>Cloud connected</strong><p>Node.js API and MongoDB architecture</p></div>
        <div><span>🧩</span><strong>Smart state</strong><p>Cart and products managed with Redux</p></div>
      </section>
    </main>
  );
}
