import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addReview, getOrder, rateProduct } from "../../actions";
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
  // console.log('testing')
  console.log(orderDetails)

  var item  = orderDetails['items']
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
  const onSubmit = () => {
    // Dispatch the rateProduct and addReview actions with the orderId, rating, and review
    
    for (const items of item) {
      // alert(items.productId._id)
      dispatch(rateProduct(items.productId._id, rating,review));
    }
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
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Delivered on ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
          </Card>
        ))}
        {/* Rating and review form */}
        <Card style={{ margin: "10px 0" }}>
          <div
            className="ratingForm"
            style={{ display: "flex", flexDirection: "column" }}
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
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
