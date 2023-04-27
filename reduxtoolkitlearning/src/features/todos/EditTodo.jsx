import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectTodoById, updateTodo } from "./todoSlice";

function EditTodo() {
  const { todoId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editTodo = useSelector((state) => selectTodoById(state, todoId));

  const [todo, setTodo] = useState({
    name: editTodo.name,
    desc: editTodo.desc,
  });

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ id: todoId, ...todo }));
    navigate("/");
  };

  return (
    <div className="edittodo">
      <h1>EditTodo</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={todo.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name..."
        />
        <input
          value={todo.desc}
          onChange={handleChange}
          type="text"
          name="desc"
          placeholder="Desc..."
        />
        <button>Save Changes</button>
      </form>
    </div>
  );
}

export default EditTodo;
