import { createContext, useState } from "react";

export const todoContext = createContext();

const TodoProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [ogData, setOgData] = useState([]);
  return (
    <todoContext.Provider value={{ ogData, setOgData, error, setError }}>
      {children}
    </todoContext.Provider>
  );
};

export default TodoProvider;
