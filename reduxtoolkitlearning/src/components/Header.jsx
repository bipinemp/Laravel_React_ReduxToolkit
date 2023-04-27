import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// import { incCount } from "../features/cart/cartSlice";

function Header() {
  // const dispatch = useDispatch();
  // const count = useSelector((state) => state.cart.count);
  // const cartitems = useSelector((state) => state.cart.cartitems);

  return (
    <header>
      <div>
        <h3>
          <a href="/">Redux-Toolkit</a>
        </h3>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="todo">Todo</NavLink>
          </li>
          <li>
            <NavLink to="/cart">CartItems</NavLink>
          </li>
          {/* <li>
            <NavLink to="/cartitems">Cart({cartitems.length})</NavLink>
          </li> */}
          <li className="counter">
            {/* <h2>{count}</h2> */}
            <button onClick={() => dispatch(incCount())}>
              <b>+</b>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
