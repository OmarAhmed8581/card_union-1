import { productConstants } from '../actions/constants'; // Import your constants

const initState = {
  productsall: [], // Initial state for all products
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        productsall: action.payload,
      };
    // ... other cases ...
    default:
      return state;
  }
};

export default productReducer;