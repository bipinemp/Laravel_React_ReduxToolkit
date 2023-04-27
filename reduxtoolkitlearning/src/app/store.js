import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todos/todoSlice";
import counterReducer from "../features/createactionreducer/counterSlice";
import cartReducer from "../features/cart/cartSlice";
import todoToolkitReducer from "../features/todotoolkit/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    counter: counterReducer,
    cart: cartReducer,
    todotoolkit: todoToolkitReducer,
  },
});
