import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);
    
    if (res.status === 200) {
      console.log(res,"getProductBySlug")
        dispatch({
            type: productConstants.GET_PRODUCTS_BY_SLUG,
            payload: res.data
        });
    } else {
        // dispatch({
        //     type: 
        // })
    }
    }
};

export const getProductPage = (payload) => {
    return async dispatch => {
        try {
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if (res.status === 200) {
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        } catch(error) {
            console.log(error)
        }

    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        let res;
        try {
            const { productId } = payload.params;
            res = await axios.get(`/product/${productId}`);
            console.log(res);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product }
            });

        } catch(error) {
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            });
        }

    }
}

export const getproduct = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
      const res = await axios.get('product/getAllProductsdata'); // Use axios.get() instead of axios.GET()
      if (res.status === 200) {
        console.log("getAllProducts");
        const { products } = res.data; // Assuming the response contains a "products" field
        console.log(products);
        dispatch({
          type: productConstants.GET_PRODUCT_SUCCESS,
          payload: { products }, // Use "products" instead of "product"
        });
      } else {
        console.log("getAllProducts Fail");
        dispatch({ type: productConstants.GET_PRODUCT_FAILURE });
      }
    } catch (error) {
      console.log(error);
    }
  };
};






export const getproductmenu = ()  => async (req, res) => {
  try {
    const response = await axios.put(`product/getAllProductsdatamenu`);
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const rateProduct = (prodId, star , review , username,productPicture) => async (dispatch) => {
  try {
    // console.log("Sending data to server:", { star, prodId, review, username, reviewimages });
    const formData = new FormData();
    formData.append("star", star);
    formData.append("prodId", prodId);
    formData.append("review", review);
    formData.append("username", username);

    // Append each image file to the formData
    for (const imageFile of productPicture) {
      formData.append("productPicture", imageFile);
    }


    const response = await axios.put(`/product/${prodId}`, formData);
    console.log(productConstants.RATE_PRODUCT_SUCCESS)
    dispatch({
      type: productConstants.RATE_PRODUCT_SUCCESS,
      payload: response.data.message,
    });
    
  } catch (error) {
    dispatch({
      type: productConstants.RATE_PRODUCT_FAILURE,
      payload: error,
    });
  }
};

export const refundProduct = (orderid, itemid ,  refund,buyername) => async (dispatch) => {
  try {
    const response = await axios.put(`/order/${orderid}`, {orderid ,  itemid , refund,buyername});
    console.log(productConstants.REFUND_PRODUCT_SUCCESS)
    dispatch({
      type: productConstants.REFUND_PRODUCT_SUCCESS,
      payload: response.data.message,
    });
    
  } catch (error) {
    dispatch({
      type: productConstants.REFUND_PRODUCT_FAILURE,
      payload: error,
    });
  }
};
  
  // Action creator for adding a review to a product
  export const addReview = (prodId, review , username , star ) => async (dispatch) => {
    try {
      const response = await axios.post(`/products/${prodId}/review`, { review ,prodId , username , star  });
  
      dispatch({
        type: productConstants.ADD_REVIEW_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: productConstants.ADD_REVIEW_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
  