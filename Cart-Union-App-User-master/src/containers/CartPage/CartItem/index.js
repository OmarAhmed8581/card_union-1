import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem} from "../../../actions";
import "./style.css";

/**
 * @author
 * @function CartItem
 **/

const CartItem = (props) => {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const buynowValue = urlParams.get('name');

  // alert(buynowValue)
  console.log('cartitem props')
  console.log(props)

  const dispatch = useDispatch();
  
  let { _id, name, price, img , discountOnQuantity ,discountPercentage} = props.cartItem;

  let initialQty;
  let initialDiscountOnQuantity;

  if (buynowValue === 'quotation') {
    initialQty = 1;
    discountOnQuantity = 1;
  }
  else if(buynowValue === 'cart'){
    initialQty = props.cartItem.discountOnQuantity;
    discountOnQuantity = props.cartItem.discountOnQuantity;
  }
  else {
    initialQty = props.cartItem.discountOnQuantity;
    discountOnQuantity = props.cartItem.discountOnQuantity;
  }

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  const [qty, setQty] = useState(initialQty);
  console.log("qty")
  console.log(qty)
  const onQuantityIncrement = () => {
  
    if(buynowValue!='quotation'){
      if(discountOnQuantity<=qty+1){  
        setQty(qty + 1);
        props.onQuantityInc(_id, qty + 1);
      }
    }
  };
  const onQuantityDecrement = () => {
    if(buynowValue!='quotation'){
      if(discountOnQuantity<=qty-1){
        if (qty <= 1) return;
        setQty(qty - 1);
        props.onQuantityDec(_id, qty - 1);
      }
    }
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
          onClick={() => onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
