import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const getorder = () => {
    return async (dispatch) => {
      try {
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST });
        const res = await axios.post(`order/getorder`);
        if (res.status === 200) {
          const { order } = res.data;
          // console.log(products,"getProducts")
          dispatch({
            type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
            payload: { order },
          });
        } else {
          dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_FAILURE });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };