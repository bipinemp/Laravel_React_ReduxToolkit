import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { todoContext } from "../context/todoContext";
import { Link } from "react-router-dom";

function Todo() {
  const imgRef = useRef();
  const { ogData, setOgData, error, setError } = useContext(todoContext);
  const [data, setData] = useState({
    name: "",
    desc: "",
  });
  const [imgFile, setImgFile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", imgFile);
    formdata.append("name", data.name);
    formdata.append("desc", data.desc);

    await axios
      .post("http://127.0.0.1:8000/api/insertdata", formdata)
      .then((res) => {
        setError("");
        setOgData([...ogData, res.data]);
        setData({
          name: "",
          desc: "",
        });
        imgRef.current.value = "";
      })
      .catch((err) => {
        setError(err.response.data.errors);
      });
  };

  useEffect(() => {
    const getTheData = async () => {
      await axios
        .get("http://127.0.0.1:8000/api/getdata")
        .then((res) => {
          setOgData(res.data.data);
        })
        .catch((err) => console.log(err));
    };
    getTheData();
  }, []);

  const handleDelete = async (id) => {
    await axios.get(`http://127.0.0.1:8000/api/deletedata/${id}`);
    const newData = ogData.filter((item) => item.id !== id);
    setOgData(newData);
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setImgFile(e.target.files[0]);
  };

  const input = {
    padding: "10px",
    marginBottom: "5px",
    fontSize: "1.2rem",
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        alignItems: "center",
      }}
    >
      <h1>Todo</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={data.name}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="name"
          style={input}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>{error.name}</p>
        <input
          value={data.desc}
          onChange={handleChange}
          type="text"
          name="desc"
          placeholder="desc"
          style={input}
        />
        <p style={{ color: "red", fontSize: "0.8rem" }}>{error.desc}</p>
        <input ref={imgRef} type="file" name="image" onChange={handleFile} />
        <p style={{ color: "red", fontSize: "0.8rem" }}>{error.image}</p>

        <button style={input} type="submit">
          Submit
        </button>
      </form>

      {ogData.length === 0 ? (
        <p style={{ color: "red" }}>No Todos !!</p>
      ) : (
        <>
          {ogData.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "200px",
                  background: "rgb(235, 235, 235)",
                  padding: "10px",
                  marginBottom: "5px",
                }}
              >
                <p>
                  <b>name:</b> {item.name}
                </p>
                <p>
                  <b>desc:</b> {item.desc}
                </p>
                <b>Id:{item.id}</b>
                <img
                  src={import.meta.env.VITE_IMAGE_URL + item.image}
                  width="100px"
                  alt="My Image"
                />

                <button onClick={() => handleDelete(item.id)}>delete</button>
                <Link to={`/edit/${item.id}`}>Edit</Link>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Todo;
