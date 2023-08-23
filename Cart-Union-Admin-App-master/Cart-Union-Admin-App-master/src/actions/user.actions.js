import axios from "../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {message},
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};



export const getuser = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.FETCH_User_REQUEST });
      const res = await axios.post(`user/getAlluser`);
      if (res.status === 200) {
        console.log("getAlluser ")
        const { users } = res.data;
        console.log(res.data)
        console.log(res.data,"getAlluser")
        dispatch({
          type: userConstants.FETCH_User_SUCCESS,
          payload:res.data ,
        });
      } else {
        console.log("getAlluser Fail")
        dispatch({ type: userConstants.FETCH_User_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
