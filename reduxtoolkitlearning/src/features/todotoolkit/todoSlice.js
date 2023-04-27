import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const todoAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = todoAdapter.getInitialState();

const todoSlice = createSlice({
  name: "todotoolkit",
  initialState,
  reducers: {
    addTodo: todoAdapter.addOne,
    removeTodo: todoAdapter.removeOne,
    editTodo: todoAdapter.updateOne,
  },
});

export const { selectAll: getAllTodos } = todoAdapter.getSelectors(
  (state) => state.todotoolkit
);

export const { addTodo, removeTodo, editTodo } = todoSlice.actions;

export default todoSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   todo: [],
// };

// const todoSlice = createSlice({
//   name: "todotoolkit",
//   initialState,
//   reducers: {
//     addTodo(state, action) {
//       state.todo.push(action.payload);
//     },
//     removeTodo(state, action) {
//       state.todo = state.todo.filter((item) => item.id !== action.payload);
//     },
//   },
// });

// export const getAllTodos = (state) => state.todotoolkit.todo;

// export const { addTodo, removeTodo } = todoSlice.actions;

// export default todoSlice.reducer;
