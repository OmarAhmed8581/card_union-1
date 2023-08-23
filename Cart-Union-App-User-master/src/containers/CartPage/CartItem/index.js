import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img , discountOnQuantity ,discountPercentage} = props.cartItem;
  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  return (
    <div className="cartItemContainer">
      <div className="flexRow">
        <div className="cartProImgContainer">
          <img src={generatePublicUrl(img)} alt={""} />
        </div>
        <div className="cartItemDetails">
          <div style={{paddingLeft:'10px'}}>
            <p style={{fontWeight:'bold'}}>NAME : <span style={{fontWeight:'bolder'}}>{name}</span></p>
            <p style={{fontWeight:'bold'}}>Rs. <span style={{fontWeight:'bolder'}}>{price}</span></p>
            <div>
              <p>Avail <span style={{fontWeight:'bolder'}}>{discountPercentage}%</span> OFF on Order of <span style={{fontWeight:'bolder'}}>{discountOnQuantity}</span> or more Items</p>
              
            </div>
          </div>
          <div style={{display:'flex' , flexDirection:'column' , justifyContent:'space-between'}}>
          <div><span style={{fontWeight:'500' , color:'Orange'}}>Delivery in 3 - 5 days</span></div>
          <p>{qty >= discountOnQuantity ?<span style={{fontWeight:'bold' , color:'green'}}>Your Discount : {(price*qty)*discountOnQuantity/100} </span>: null}</p>
          <p>{qty >= discountOnQuantity ?<span style={{fontWeight:'bold' , color:'green'}}>Your Discounted Price : {price*qty-(price*qty)*discountOnQuantity/100} </span>:<span style={{color:'red' , fontWeight:'bold'}}>No Discount</span>}</p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "5px 0",
        }}
      >
        {/* quantity control */}
        <div className="quantityControl">
          <button onClick={onQuantityDecrement}>-</button>
          <input value={qty} readOnly />
          <button onClick={onQuantityIncrement}>+</button>
        </div>
        <button className="cartActionBtn">save for later</button>
        <button
          className="cartActionBtn"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
