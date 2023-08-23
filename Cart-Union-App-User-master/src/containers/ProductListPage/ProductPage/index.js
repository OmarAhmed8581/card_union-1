import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import { useLocation } from "react-router-dom";
import  Card  from '../../../components/UI/Card'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

/**
 * @author
 * @function ProductPage
 **/

export const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  const location = useLocation();

  useEffect(() => {
    const params = getParams(location.search);
    console.log({ params });
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}} autoPlay interval="2000" infiniteLoop>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block", width: "100%", height: "500px" }}
              href={banner.navigateTo}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={banner.img}
                alt=""
              />
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px 0",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{
                width: "400px",
                height: "200px",
                margin: "5px",
              }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={product.img}
                alt=""
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
