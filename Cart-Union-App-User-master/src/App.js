import "./App.css";
import HomePage from "./containers/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart,getproductmenu } from "./actions";
import { useEffect } from "react";
import { ProductDetailsPage } from "./containers/ProductDetailsPage";
import { CartPage } from "./containers/CartPage";
import { CheckoutPage } from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate, dispatch]);
  
  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
    dispatch(getproductmenu());
  }, [auth.authenticate, dispatch]);
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/orders" element={<OrderPage />} />
          <Route path="/order_details/:orderId" element={<OrderDetailsPage />}/>
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage/>}/>
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
