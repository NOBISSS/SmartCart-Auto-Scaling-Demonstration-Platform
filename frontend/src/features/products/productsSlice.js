
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../services/productService";
import { fallbackProducts } from "../../data/fallbackProducts";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProducts();

      if (!Array.isArray(data)) {
        throw new Error("The products API did not return an array.");
      }

      return data.map((product, index) => ({
        ...product,
        _id: String(product._id ?? product.id ?? `product-${index}`),
        name: product.name ?? product.title ?? "Unnamed product",
        price: Number(product.price ?? 0),
        category: product.category ?? "Other",
        description: product.description ?? "",
      }));
    } catch (error) {
      return rejectWithValue(error.message || "Unable to load products.");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    source: "api",
  },
  reducers: {
    useFallbackProducts(state) {
      state.items = fallbackProducts;
      state.status = "succeeded";
      state.source = "demo";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.items = action.payload;
          state.source = "api";
        } else {
          state.items = fallbackProducts;
          state.source = "demo";
        }

        state.status = "succeeded";
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.items = fallbackProducts;
        state.status = "succeeded";
        state.source = "demo";
        state.error = action.payload || "Backend unavailable";
      });
  },
});

export const { useFallbackProducts } = productsSlice.actions;

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectProductsSource = (state) => state.products.source;

export default productsSlice.reducer;
