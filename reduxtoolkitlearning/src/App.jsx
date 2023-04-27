import Layout from "./components/Layout";
// import TodosList from "./features/todos/TodosList";
// import AddTodo from "./features/todos/AddTodo";
// import SingleTodo from "./features/todos/SingleTodo";
// import EditTodo from "./features/todos/EditTodo";
// import EditTodoN from "./components/EditTodoN";

import { Routes, Route, Navigate } from "react-router-dom";
import TodoList from "./features/todortk/TodoList";
// import Todo from "./components/Todo";
// import Counter from "./features/createactionreducer/Counter";
// import CartItems from "./features/cart/CartItems";
// import Cart from "./features/cart/Cart";
// import Todo from "./features/todotoolkit/Todo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<TodoList />} />
        {/* <Route path="/todo" element={<Todo />} /> */}
        {/* <Route path="/todotoolkit" element={<Todo />} /> */}
        {/* <Route path="/cart" element={<CartItems />} /> */}
        {/* <Route path="/cartitems" element={<Cart />} /> */}
        {/* <Route index element={<Todo />} /> */}
        {/* <Route path="/edit/:editId" element={<EditTodoN />} /> */}
        {/* <Route index element={<TodosList />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="todo">
          <Route index element={<AddTodo />} />
          <Route path=":todoId" element={<SingleTodo />} />
          <Route path="edit/:todoId" element={<EditTodo />} />
        </Route> */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
