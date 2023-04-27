import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTodoN() {
  const { editId } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    id: editId,
    name: "",
    desc: "",
    image: "",
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(editId);
    const getEdit = async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/editdata/${editId}`)
        .then((res) => {
          setEditData({
            id: res.data.data.id,
            name: res.data.data.name,
            desc: res.data.data.desc,
            image: res.data.data.image,
          });
        });
    };
    getEdit();
  }, [editId]);

  const handleImage = (e) => {
    setEditData({ ...editData, image: e.target.files[0].name });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://127.0.0.1:8000/api/update", editData);
    navigate("/todo");
  };

  return (
    <div className="edittodo">
      <h1>EditTodo</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={editData.name}
          onChange={handleChange}
          type="text"
          name="name"
        />
        <input
          value={editData.desc}
          onChange={handleChange}
          type="text"
          name="desc"
        />
        {/* {editData.image !== null && (
          <img
            src={import.meta.env.VITE_IMAGE_URL + editData.image}
            width="100px"
            alt="My Image"
          />
        )} */}

        <input onChange={handleImage} type="file" name="image" />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditTodoN;
