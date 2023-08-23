import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./containers/Home";
import { Signin } from "./containers/Signin";
import { Signup } from "./containers/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategory,
  isUserLoggedIn,
  getInitialData,
  getProducts,
  getCustomerOrders,
  getorder,
  getuser,
} from "./actions";
import { Orders } from "./containers/Orders";
import { Products } from "./containers/Products";
import { Category } from "./containers/Category";
import { Sales } from "./containers/Sales";
import { NewPage } from "./containers/NewPage";
import { Statistical } from "./containers/Statistical";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  //componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      let superAdmin = auth.user.email == "muhammadhamza11@gmail.com" ? true : false;
      dispatch(getInitialData(superAdmin));
      dispatch(getCustomerOrders())
      dispatch(getorder())
      dispatch(getuser())
      if (!superAdmin) {
        dispatch(getProducts())
       
       
      }
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<PrivateRoute  element={<Home/>}/>} /> */}
        {/* <Route path="/" element={<Home />} /> */}

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
        <Route path="/page" element={<PrivateRoute />}>
          <Route path="/page" element={<NewPage />}></Route>
        </Route>
        <Route path="/sales" element={<PrivateRoute />}>
          <Route path="/sales" element={<Sales />}></Route>
        </Route>
        <Route path="/Statistical" element={<PrivateRoute />}>
          <Route path="/Statistical" element={<Statistical />}></Route>
        </Route>
        <Route path="/category" element={<PrivateRoute />}>
          <Route path="/category" element={<Category />}></Route>
        </Route>
        <Route path="/products" element={<PrivateRoute />}>
          <Route path="/products" element={<Products />}></Route>
        </Route>
        <Route path="/orders" element={<PrivateRoute />}>
          <Route path="/orders" element={<Orders />}></Route>
        </Route>

        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
