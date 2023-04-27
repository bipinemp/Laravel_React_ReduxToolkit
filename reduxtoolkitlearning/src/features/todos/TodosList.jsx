import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTodos, removeTodo } from "./todoSlice";
import { deleteAllTodos } from "../actions/reduxActions";

function TodosList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todos = useSelector(getAllTodos);

  if (todos.length === 0) return <p className="error">No todos !!!</p>;

  return (
    <div className="todoslist">
      <h1>Todos</h1>
      <button onClick={() => dispatch(deleteAllTodos())}>
        Delete All Todos
      </button>
      {todos.map((item, index) => {
        return (
          <div key={index} className="todo">
            <h3>{item.name}</h3>
            <div>
              <button onClick={() => navigate(`/todo/${item.id}`)}>View</button>
              <button onClick={() => dispatch(removeTodo({ id: item.id }))}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TodosList;
