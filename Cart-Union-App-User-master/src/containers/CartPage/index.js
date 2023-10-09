import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems , removeCartItem} from "../../actions";
import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";
import { useNavigate } from "react-router-dom";
import PriceDetails from "../../components/PriceDetails";

/**
 * @author
 * @function CartPage
 **/

export const CartPage = (props) => {
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);

  const dispatch = useDispatch();
  var check = true

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  console.log('cartItems')
  console.log(cartItems)


  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);


  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img ,discountOnQuantity ,discountPercentage,sellerId} = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img ,discountOnQuantity ,discountPercentage,sellerId}, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img ,discountOnQuantity , discountPercentage , sellerId} = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img ,discountOnQuantity , discountPercentage , sellerId}, -1));
  };
  

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
        >
          {Object.keys(cartItems).map((key, index) => (
            <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
            />
          ))}

          <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => history(`/checkout`)}
              />
            </div>
          </div>
        </Card>

        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            // cart.cartItems[key].qty =  cart.cartItems[key].discountOnQuantity
            return qty + cart.cartItems[key].qty;
          }, 0)}

          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty ,discountOnQuantity} = cart.cartItems[key];
            return qty >= discountOnQuantity ? totalPrice + price*qty-(price*qty)*discountOnQuantity/100 : totalPrice + price * qty 
          }, 0)}
          
        />
      </div>
    </Layout>
  );
};

export default CartPage;
