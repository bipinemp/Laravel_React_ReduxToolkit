import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectTodoById } from "./todoSlice";
import { useSelector } from "react-redux";

function SingleTodo() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const todo = useSelector((state) => selectTodoById(state, todoId));

  return (
    <div className="singletodo">
      <h1>SingleTodo</h1>
      <Link to="/">
        <button style={{ padding: "8px 15px" }}>{"<< "}Go Back</button>
      </Link>
      <div>
        <h3>{todo.name}</h3>
        <p>{todo.desc}</p>
        <button onClick={() => navigate(`/todo/edit/${todoId}`)}>Edit</button>
      </div>
    </div>
  );
}

export default SingleTodo;
