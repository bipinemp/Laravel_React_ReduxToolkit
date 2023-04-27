import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../api/apiSlice";
import { useState } from "react";
import { FaUpload, FaTrash } from "react-icons/fa";

const main = {
  width: "80%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const article = {
  width: "400px",
  display: "flex",
  padding: "10px",
  backgroundColor: "rgba(0,0,0,0.1)",
  margin: "5px",
  alignItems: "center",
  gap: "10px",
};
const formdiv = {
  display: "flex",
};

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo !== "") {
      addTodo({ userId: 1, title: newTodo, completed: false });
    }
    setNewTodo("");
  };

  const newItemSection = (
    <form style={formdiv} onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div>
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FaUpload />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id} style={article}>
          <div>
            <input
              type="checkbox"
              checked={todo.completed}
              id={todo.id}
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label style={{ paddingLeft: "10px" }} htmlFor={todo.id}>
              {todo.title}
            </label>
          </div>
          <button onClick={() => deleteTodo({ id: todo.id })}>
            <FaTrash />
          </button>
        </article>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <main style={main}>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};
export default TodoList;
