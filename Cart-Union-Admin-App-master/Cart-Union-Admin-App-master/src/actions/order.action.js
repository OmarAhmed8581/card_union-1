import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getCustomerOrders = () => {
  return async (dispatch) => {
    try {
      let user = JSON.parse(localStorage.getItem("user"));
      console.log(user, "getCustomerOrdersuser")
      const res = await axios.post(`/order/getCustomerOrders/${user._id}`);
      if (res.status === 200) {
        console.log("getCustomerOrders ")
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error, "getCustomerOrder error");
    }
  };
};

export const getorder = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.FETCH_ORDERS_REQUEST });
      const res = await axios.post(`order/getAllOrders`);
      if (res.status === 200) {
        console.log("getAllOrders ")
        const { orders } = res.data;
        console.log(res.data)
        console.log(res.data,"getAllOrders")
        dispatch({
          type: orderConstants.FETCH_ORDERS_SUCCESS,
          payload: { orders },
        });
      } else {
        console.log("getAllOrders Fail")
        dispatch({ type: orderConstants.FETCH_ORDERS_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrder = (payload) => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });
    try {
      const res = await axios.post("/order/update", payload);
      if (res.status === 201) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
        dispatch(getCustomerOrders());
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
