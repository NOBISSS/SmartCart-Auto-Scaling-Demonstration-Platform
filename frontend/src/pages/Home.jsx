import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
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

export default function Home() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const source = useSelector(selectProductsSource);
  const error = useSelector(selectProductsError);

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
    <main className="max-w-[1600px] mx-auto">
      <section className="min-h-[360px] my-0 mx-[7%] max-[1050px]:mx-[5%] mt-[34px] p-[48px_6%] max-[750px]:p-[38px_7%] grid grid-cols-[1.2fr_0.8fr] max-[750px]:grid-cols-1 items-center overflow-hidden relative rounded-[26px] bg-[#eaf1e6]">
        <div className="relative z-[2]">
          <span className="text-[#276749] text-[0.73rem] font-extrabold tracking-[1.5px] uppercase block">YOUR EVERYDAY MARKETPLACE</span>
          <h1 className="max-w-[580px] my-[18px] mb-[14px] font-['Manrope',sans-serif] font-extrabold text-[clamp(2.2rem,4.2vw,3.7rem)] leading-[1.12] tracking-[-2px] text-[#20251f]">
            Find your next <span className="text-[#276749]">favourite.</span>
          </h1>
          <p className="max-w-[430px] text-[#596659] leading-[1.8] text-base m-0">
            Discover useful essentials, fresh finds, and everyday favourites—all in one place.
          </p>
          <a className="inline-flex items-center gap-4 mt-[15px] px-[18px] py-[13px] rounded-[10px] text-white bg-[#276749] font-bold text-sm cursor-pointer transition-colors hover:bg-[#174b35]" href="#products">
            Explore products <span className="text-white inline-block">→</span>
          </a>
        </div>
        <div className="min-h-[245px] max-[750px]:min-h-[180px] grid place-items-center relative select-none" aria-hidden="true">
          <span className="absolute w-[235px] h-[235px] max-[750px]:w-[170px] max-[750px]:h-[170px] border border-[rgba(39,103,73,0.16)] rounded-full" />
          <span className="absolute w-[180px] h-[180px] max-[750px]:w-[130px] max-[750px]:h-[130px] border border-[rgba(39,103,73,0.16)] rounded-full bg-white/35" />
          <span className="relative z-[1] grid place-items-center w-[135px] h-[135px] max-[750px]:w-[100px] max-[750px]:h-[100px] rounded-[36px] max-[750px]:rounded-[28px] bg-white shadow-[0_20px_45px_rgba(36,78,47,0.13)] text-[4.5rem] max-[750px]:text-[3.2rem] -rotate-7">🛍️</span>
          <span className="absolute text-[#276749] text-[2rem] top-5 right-[22%]">✦</span>
          <span className="absolute text-[#276749] text-[2rem] bottom-[25px] left-[18%]">✳</span>
        </div>
      </section>

      <section className="py-[55px] pt-[72px] px-[7%] max-[1050px]:px-0 max-[1050px]:mx-[5%]" id="products">
        <div className="flex items-end max-[420px]:items-start max-[420px]:flex-col justify-between gap-5 max-[420px]:gap-[10px] mb-[25px]">
          <div>
            <span className="text-[#276749] text-[0.73rem] font-extrabold tracking-[1.5px] uppercase block">CURATED FOR YOU</span>
            <h2 className="my-[9px] mb-[7px] font-['Manrope',sans-serif] font-extrabold text-[clamp(1.6rem,3vw,2.25rem)] tracking-[-0.8px] text-[#20251f]">Explore the collection</h2>
            <p className="m-0 text-[#747a71] text-base">Everyday products, thoughtfully picked.</p>
          </div>
          <span className="shrink-0 pb-[5px] text-[#747a71] text-[0.85rem]">{filteredProducts.length} products</span>
        </div>

        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onSelect={setCategory}
        />

        {source === "demo" && status === "succeeded" && (
          <p className="mb-5 px-[15px] py-3 rounded-[10px] bg-[#fff6dd] text-[#755d1c] text-[0.85rem] leading-[1.5]">
            Showing demo products{error ? ` — ${error}` : ". Connect the backend to load your live catalogue."}
          </p>
        )}

        {status === "loading" ? (
          <div className="py-[55px] px-5 text-center text-[#747a71]">Loading your products…</div>
        ) : (
          <ProductGrid
            products={filteredProducts}
            onAdd={(product) => dispatch(addToCart(product))}
          />
        )}
      </section>

      <section className="grid grid-cols-3 max-[750px]:grid-cols-1 gap-[22px] mx-[7%] max-[1050px]:mx-[5%] mb-[65px] p-7 border border-[#e8e9e2] rounded-[18px] bg-white">
        <div className="grid grid-cols-[36px_1fr] content-start gap-x-[10px]">
          <span className="row-span-2 text-[1.5rem] select-none leading-tight">⚡</span>
          <strong className="text-[0.9rem] font-bold text-[#20251f]">Fast experience</strong>
          <p className="mt-[6px] mb-0 text-[#747a71] text-[0.79rem] leading-[1.5]">Built for a responsive shopping journey</p>
        </div>
        <div className="grid grid-cols-[36px_1fr] content-start gap-x-[10px]">
          <span className="row-span-2 text-[1.5rem] select-none leading-tight">🔒</span>
          <strong className="text-[0.9rem] font-bold text-[#20251f]">Cloud connected</strong>
          <p className="mt-[6px] mb-0 text-[#747a71] text-[0.79rem] leading-[1.5]">Node.js API and MongoDB architecture</p>
        </div>
        <div className="grid grid-cols-[36px_1fr] content-start gap-x-[10px]">
          <span className="row-span-2 text-[1.5rem] select-none leading-tight">🧩</span>
          <strong className="text-[0.9rem] font-bold text-[#20251f]">Smart state</strong>
          <p className="mt-[6px] mb-0 text-[#747a71] text-[0.79rem] leading-[1.5]">Cart and products managed with Redux</p>
        </div>
      </section>
    </main>
  );
}
