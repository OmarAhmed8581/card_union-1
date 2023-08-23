import axios from "../helpers/axios";
import { authConstants } from "./constants";

export const login = (user) => {
  console.log(user);
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axios.post(`/admin/signin`, {
      ...user,
    });

    if (res.status === 200) {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};



export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        console.log("/api/check_session?token="+token)
        // Perform an API request to check the server session
        const response = await fetch("/api/check_session?token="+token, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const user = JSON.parse(localStorage.getItem("user"));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: "Failed to login" },
          });
        }
      } catch (error) {
        console.error("Error checking session:", error);
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: "Failed to login" },
        });
      }
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};


export const signout = (userid)  => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.put(`/admin/signout`, {userid});

    if (res.status === 200) {
      localStorage.clear();
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};


export const checkloginactive = (userid)  => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.put(`/user/getuserloginActive`, {userid});
    if (res.status == 200) {
      dispatch({
        type: authConstants.LOGOUT_SUCCESS,
      });    
    } 
    else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: "No Logout" },
      });
    }
  };
};
