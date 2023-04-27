import { createSlice } from "@reduxjs/toolkit";
import { deleteAllTodos } from "../actions/reduxActions";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      const { id } = action.payload;
      state.todos = state.todos.filter((item) => item.id !== id);
    },
    updateTodo(state, action) {
      const { id, name, desc } = action.payload;
      const isTodo = state.todos.find((item) => item.id === id);
      if (isTodo) {
        isTodo.name = name;
        isTodo.desc = desc;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(deleteAllTodos, (state) => {
      state.todos = [];
    });
  },
});

export const getAllTodos = (state) => state.todos.todos;
export const selectTodoById = (state, todoId) => {
  return state.todos.todos.find((todo) => todo.id === todoId);
};

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
