import { createAction, createReducer } from "@reduxjs/toolkit";

export const increment = createAction("increment");
export const decrement = createAction("decrement");
export const reset = createAction("reset");

const initialState = {
  count: 0,
};

const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.count += 1;
    })
    .addCase(decrement, (state) => {
      state.count -= 1;
    })
    .addCase(reset, (state) => {
      state.count = 0;
    });
});

// const counterReducer = createReducer(initialState, {
//   [increment]: (state) => {
//     state.count += 1;
//   },
// });

export default counterReducer;
