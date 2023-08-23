import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
};

export default (state = initState, action) => {
  console.log(action.type)
  switch (action.type) {
    case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orders,
      };
      case orderConstants.FETCH_ORDERS_SUCCESS:
        state = {
          ...state,
          orders: action.payload.orders,
        };
      break;
  }

  return state;
};
