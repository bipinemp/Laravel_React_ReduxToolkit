import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, getTotal, increment, removeCartItem } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);
  const subtotal = useSelector((state) => state.cart.subtotal);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartitems, dispatch]);

  if (cartitems.length < 1) return <p className="msg">No Items in Cart !!</p>;

  return (
    <div className="cart">
      <h1>Cart</h1>
      <h2>Total : {subtotal.toFixed(3)}</h2>
      <br />
      <div className="cartitemmain">
        {cartitems.map((item) => {
          return (
            <div key={item.id} className="cartitem">
              <h3>{item.title}</h3>
              <p>${item.price}</p>
              <img src={item.img} alt="" width="70px" />
              <span>
                <b>Quantity: {item.quantity}</b>
                <button onClick={() => dispatch(increment(item.id))}>+</button>
                <button
                  onClick={() => dispatch(decrement(item.id))}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
              </span>
              <button onClick={() => dispatch(removeCartItem(item.id))}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cart;
