import { memo } from "react";
import { addToCart } from "./cartSlice";
import { useDispatch } from "react-redux";

const SingleCartItem = memo(({ item }) => {
  const dispatch = useDispatch();
  return (
    <div className="cartitem">
      <h3>{item.title}</h3>
      <p>${item.price}</p>
      <img src={item.img} alt="" width="70px" />
      <button onClick={() => dispatch(addToCart(item))}>Add To Cart</button>
    </div>
  );
});

export default SingleCartItem;
