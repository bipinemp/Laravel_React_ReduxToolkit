import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./todoSlice";
import { getAllTodos } from "./todoSlice";
import { v4 as uuidv4 } from "uuid";
import { formatDistanceToNow } from "date-fns";

function Todo() {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState("");
  const todos = useSelector(getAllTodos);

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date();
    const newData = {
      text: data,
      id: uuidv4(),
      createdAt: date.toISOString(),
    };
    dispatch(addTodo(newData));
    setData("");
  };

  const handleEdit = (text, id) => {
    setEditing(true);
    setEditId(id);
    setEditData(text);
  };

  const handleUpdate = () => {
    const updatedData = {
      id: editId,
      changes: {
        text: editData,
      },
    };
    dispatch(editTodo(updatedData));
    setEditData("");
    setEditId("");
    setEditing(false);
  };

  return (
    <div className="todotoolkit">
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="enter todo ..."
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button>Add Todo</button>
      </form>
      {todos.length === 0 && <p className="error">No Todos :(</p>}
      {todos.map((item) => (
        <div key={item.id}>
          {editing && editId === item.id ? (
            <div>
              <input
                type="text"
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
              />
              <button onClick={handleUpdate}>Save Changes</button>
              <button onClick={() => setEditing(false)}>cancel</button>
            </div>
          ) : (
            <div className="todoitem">
              <b>{item.text}</b>
              <br />
              <i>Created {formatDistanceToNow(new Date(item.createdAt))} ago</i>
              <br />
              <button onClick={() => handleEdit(item.text, item.id)}>
                edit
              </button>
              <button onClick={() => dispatch(removeTodo(item.id))}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Todo;
