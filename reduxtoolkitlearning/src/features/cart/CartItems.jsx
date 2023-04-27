import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "./cartSlice";
import { memo } from "react";
import SingleCartItem from "./SingleCartItem";

function CartItems() {
  const dispatch = useDispatch();
  const { cart, error, status } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="msg">Loading CartItems...</p>;
  }

  if (status === "failed") {
    return <p className="msg">{error}</p>;
  }

  return (
    <div className="cart">
      <h1>CartItems</h1>
      <br />

      <div className="cartitemmain">
        {cart.map((item) => (
          <SingleCartItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default CartItems;
