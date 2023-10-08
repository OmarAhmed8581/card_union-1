import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview, getOrder, rateProduct, refundProduct } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import { generatePublicUrl } from "../../urlConfig";
import ReactStars from "react-rating-stars-component";
import whatsapp from "../../images/whatsapp.png";
import "./style.css";

/**
 * @author
 * @function OrderDetails
 **/

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);
  const product = useSelector((state) => state.product);
  const auth = useSelector((state) => state.auth);
  const [productPictures, setProductPictures] = useState([]);
  console.log('testing')
  
  var item  = orderDetails['items']
  var orderid  = orderDetails['_id']
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const isLogin = localStorage.getItem("token")
  let params = useParams();
  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const handleProductPicture = (e) => {
    const selectedImage = e.target.files[0];
    console.log("Selected Image:", selectedImage);
    setProductPictures([...productPictures, selectedImage]);
    console.log("Selected Image1:", productPictures);
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  const onReturn = (orderid , itemid)=>{
    alert("Refund Product")
    dispatch(refundProduct(orderid, itemid,document.getElementById(itemid+"_return").value,document.getElementById("fullName").innerText));
  }
  const onSubmit = () => {
      console.log("productPictures"+productPictures)
      for (const items of item) {
      
        dispatch(rateProduct(items.productId._id, rating,review,document.getElementById("fullName").innerText,productPictures));
      }
      // setProductPictures([]);
      alert("Review Submit")


      // Reset the rating and review inputs
      // setRating(0);
      setReview("");
   
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        <Card
          style={{
            margin: "10px 0",
          }}
        >
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Delivery Address</div>
              <div className="delName">{orderDetails.address.name}</div>
              <div className="delAddress">{orderDetails.address.address}</div>
              <div className="delPhoneNumber">
                Phone number {orderDetails.address.mobileNumber}
              </div>
              <div className="delAddress"><span style={{fontWeight:'bold'}}>Total Amount:</span> {orderDetails.totalAmount}</div>
              <div className="delTitle" style={{marginTop:'10px'}}>Estimated Delivery</div>
              <div className="delName">10-20 Days</div>
              {isLogin && (
              <a
                href={`https://wa.me/${product.productDetails.createdBy?.contactNumber}`}
              >
                <img
                  src={whatsapp}
                  style={{ width: "3vw", height: "auto",paddingTop:'10px', cursor: "pointer" }}
                />
              </a>
            )}
            </div>
            <div className="delMoreActionContainer">
              <div className="delTitle">More Actions</div>
              {/* <div className="delName">Download Invoice not Now but in Future we are Working on it</div> */}
              
            </div>
          </div>
        </Card>

        {orderDetails.items.map((item, index) => (
          <Card
            style={{ display: "flex", padding: "20px 0", margin: "10px 0" }}
          >
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
              </div>
              <div style={{ width: "250px" }}>
                <div className="delItemName">{item.productId.name}</div>
                
                {/* <div className="delItemName">{item.productId && item.productId.name
                    ? item.productId.name
                    : "Unknown"}</div> */}

                <Price value={item.payablePrice} />
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date" id={`${item._id}_date`}>{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {(orderDetails.orderStatus[3].isCompleted) && (
                <div>
                  <div className="delTitle">Return/refund</div>
                  <select id={`${item._id}_return`} style={{color: "#5D6D7E",width: "100%",
                    height: "36%",
                    border: "none",
                    background: "#ECF0F1fc"}}>
                    <option value="0">please select</option>
                    <option value="Item not received">Item not received</option>
                    <option value="Item received damage">Item received damage</option>
                  
                  </select>

                  <button
                  class="form-control-sm"
                  style={{
                    cursor: "pointer",
                    width: "30%",
                    margin: "5px",
                    fontWeight: "bold",
                    backgroundColor: "rgb(7, 31, 69)",
                    fontSize: "10px",
                    borderRadius: "5px",
                    color: "whitesmoke",
                  }}
                  onClick={() => onReturn( orderid, item._id)}
                >
                  Return
                </button>

              </div>
            )}
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
        {/* Rating and review form */}

        {(orderDetails.orderStatus[3].isCompleted) && (
          <Card style={{ margin: "10px 0" }}>
            <div
              className="ratingForm"
              style={{ display: "flex", flexDirection: "column",padding:"1%" }}
            >
              <ReactStars
                count={5}
                value={rating}
                onChange={(newRating) => setRating(newRating)}
                size={24}
                activeColor="#ffd700"
              />
              <textarea
                placeholder="Write a review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              {productPictures.length > 0
                  ? productPictures.map((pic, index) => (
                      <div key={index}> {pic.name}</div>
                    ))
                : null}
              <input
                type="file"
                name="productPicture"
                onChange={handleProductPicture}
              />
              <button
                class="form-control-sm"
                style={{
                  cursor: "pointer",
                  width: "5%",
                  margin: "5px",
                  fontWeight: "bold",
                  backgroundColor: "rgb(7, 31, 69)",
                  fontSize: "10px",
                  borderRadius: "5px",
                  color: "whitesmoke",
                }}
                onClick={onSubmit}
              >
                Submit
              </button>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
