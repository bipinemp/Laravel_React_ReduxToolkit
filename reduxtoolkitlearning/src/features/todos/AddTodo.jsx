import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function AddTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    name: "",
    desc: "",
  });

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = { ...todo, id: uuidv4() };
    dispatch(addTodo(newTodo));
    setTodo({
      name: "",
      desc: "",
    });
    navigate("/");
  };

  return (
    <div className="addtodo">
      <h1>AddTodo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={todo.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="desc"
          placeholder="desc"
          value={todo.desc}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddTodo;
