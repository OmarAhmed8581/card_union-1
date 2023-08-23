import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { IoIosArrowForward } from "react-icons/io";
import { Breed } from "../../components/MaterialUI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupee, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                {/* <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                  />
                </div> */}
                <div className="orderImgContainer">
                  {item.productId &&
                    item.productId.productPictures &&
                    item.productId.productPictures.length > 0 && (
                      <img
                        className="orderImg"
                        src={generatePublicUrl(
                          item.productId.productPictures[0].img
                        )}
                      />
                    )}
                </div>
                <div className="orderRow">
                  <div className="orderName">
                    {item.productId && item.productId.name}
                  </div>
                  <div className="orderPrice">
                    <FontAwesomeIcon icon={faRupee} />
                    &nbsp;
                    <FontAwesomeIcon icon={faArrowRight} />
                    &nbsp;
                    {item.payablePrice}
                  </div>
                  {/* <div>
                    if(qty ==10){
                      item.payablePrice
                    }
                  </div> */}
                  <div>{order.paymentType}</div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
