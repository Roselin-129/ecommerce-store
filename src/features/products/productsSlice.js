import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productsSlice.reducer;