import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://course-api.com/react-useReducer-cart-project";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  const response = await axios.get(URL);
  return response.data;
});

const initialState = {
  cart: [],
  cartitems: [],
  status: "idle",
  error: null,
  subtotal: 0,
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const inCart = state.cartitems.find(
        (item) => item.id === action.payload.id
      );
      if (inCart) {
        inCart.quantity++;
      } else {
        state.cartitems.push({ ...action.payload, quantity: 1 });
      }
    },
    increment(state, action) {
      const inCart = state.cartitems.find((item) => item.id === action.payload);
      if (inCart) {
        inCart.quantity++;
      } else {
        return inCart;
      }
    },
    decrement(state, action) {
      const inCart = state.cartitems.find((item) => item.id === action.payload);
      if (inCart) {
        inCart.quantity--;
      } else {
        return inCart;
      }
    },
    getTotal(state) {
      state.subtotal = state.cartitems.reduce(
        (total, item) => (total = total + item.price * item.quantity),
        0
      );
    },
    removeCartItem(state, action) {
      state.cartitems = state.cartitems.filter(
        (item) => item.id !== action.payload
      );
    },
    incCount(state) {
      state.count = state.count += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addToCart,
  increment,
  decrement,
  getTotal,
  removeCartItem,
  incCount,
} = cartSlice.actions;

export default cartSlice.reducer;
