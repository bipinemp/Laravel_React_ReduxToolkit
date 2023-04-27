import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "./counterSlice";

function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);

  const counter = {
    width: "200px",
    margin: "0 auto",
  };
  const btn = {
    padding: "10px 20px",
  };
  const num = {
    fontSize: "2rem",
  };
  return (
    <div style={counter}>
      <h1>Counter</h1>
      <p>
        <b style={num}>{count}</b>
      </p>
      <button style={btn} onClick={() => dispatch(increment())}>
        +
      </button>
      <button style={btn} onClick={() => dispatch(decrement())}>
        -
      </button>
      <button style={btn} onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
