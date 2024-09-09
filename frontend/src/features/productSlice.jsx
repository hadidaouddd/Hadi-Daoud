import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Function to retrieve the token from localStorage
const getToken = () => {
  return localStorage.getItem("token"); // Assuming token is stored in localStorage
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const token = getToken(); // Get the token if available
    const res = await axios.get("http://localhost:4000/api/products", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token if needed
      },
    });
    return res.data;
  }
);

// Initial state for the product slice
const initialState = {
  products: [],
  status: "idle", // idle, loading, succeeded, failed
  error: null,
};

// Slice for managing products state
const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload; // Set fetched products in state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Set error message
      });
  },
});

export default productSlice.reducer;
