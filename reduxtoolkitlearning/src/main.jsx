import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import TodoProvider from "./context/todoContext";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <Provider store={store}>
        <ApiProvider api={apiSlice}>
          <Router>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </Router>
        </ApiProvider>
      </Provider>
    </TodoProvider>
  </React.StrictMode>
);
