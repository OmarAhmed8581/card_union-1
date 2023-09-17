import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import { MaterialButton } from "../../../components/MaterialUI";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";
import "./style.css";
/**
 * @author
 * @function ProductStore
 **/

export const ProductStore = (props) => {
  // const product = useSelector((state) => state.product);
  // const priceRange = product.priceRange;
  // const dispatch = useDispatch();
  // let params = useParams();

  // useEffect(() => {
  //   console.log(props);
  //   dispatch(getProductBySlug(params.slug));
  // }, [dispatch, params.slug, props]);
  // console.log('product.priceRange');
  // console.log(product.priceRange);
  // return (
  //   <>
  //     {Object.keys(product.productsByPrice).map((key, index) => {
  //       return (
  //         <Card
  //           headerLeft={`${params.slug} ITEMS under ${priceRange[key]}`}
  //           headerRight={
  //             <MaterialButton
  //               title={"VIEW ALL"}
  //               style={{
  //                 width: "96px",
  //               }}
  //               bgColor="#071F45"
  //               fontSize="12px"
  //             />
  //           }
  //           style={{
  //             width: "calc(100% - 40px)",
  //             margin: "20px",
  //           }}
  //         >
  //           <div style={{ display: "flex" }}>
  //             {product.productsByPrice[key].map((product) => {
  //               if (product.productStatus == "active") {
  //                 return (
  //                   <Link
  //                     to={`/${product.slug}/${product._id}/p`}
  //                     className="productContainer"
  //                     style={{
  //                       display: "block",
  //                       textDecoration: "none",
  //                       color: "#000",
  //                     }}
  //                   >
  //                     <div className="productImgContainer">
  //                       <img
  //                         src={generatePublicUrl(
  //                           product.productPictures[0].img
  //                         )}
  //                         alt=""
  //                       />
  //                     </div>
  //                     <div className="productInfo">
  //                       <div style={{ margin: "5px 0" }}>{product.name}</div>
  //                       <div>
  //                         <Rating value={product.ratings[0]?.star?.toFixed(1) || 0 }/>
  //                         &nbsp;&nbsp;
  //                         <span
  //                           style={{
  //                             color: "#777",
  //                             fontWeight: "500",
  //                             fontSize: "12px",
  //                           }}
  //                         >
  //                           ({product.totalreview})
  //                         </span>
  //                       </div>
  //                       <Price value={product.price} />
  //                     </div>
  //                   </Link>
  //                 );
  //               }
  //             })}
  //           </div>
  //         </Card>
  //       );
  //     })}
  //   </>
  // );
  const product = useSelector((state) => state.product);
  const priceRange = product.priceRange;
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getProductBySlug(params.slug));
  }, [dispatch, params.slug]);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        const productsInPriceRange = product.productsByPrice[key];

        // Sort products based on highest star rating
        const sortedProducts = productsInPriceRange.slice().sort((a, b) => {
          const aStarRating = a.ratings.reduce((total, rating) => total + rating.star, 0);
          const bStarRating = b.ratings.reduce((total, rating) => total + rating.star, 0);
          return bStarRating - aStarRating; // Descending order
        });
        console.log('sortedProducts')
        console.log(sortedProducts)

        return (
          <Card
            key={key}
            headerLeft={`${params.slug} ITEMS under ${priceRange[key]}`}
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
            }}
            >
            <div style={{ display: "flex" ,maxWidth: "100%",overflow: "auto"  }} id="style-2">

              {sortedProducts.map((product) => {
                if (product.productStatus == "active") {
                  return (
                    <Link
                      to={`/${product.slug}/${product._id}/p`}
                      className="productContainer"
                      style={{
                        display: "block",
                        textDecoration: "none",
                        color: "#000",
                      }}
                    >
                      <div className="productImgContainer">
                      {product.productPictures[0].img.endsWith(".mp4") ? (

                        <video width="200" height="150" autoPlay>
                          <source src={generatePublicUrl(product.productPictures[0].img)} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ): (
                        <img
                        src={generatePublicUrl(
                          product.productPictures[0].img
                        )}
                        alt=""
                      />
                      )}
                       
                      </div>
                      <div className="productInfo">
                        <div style={{ margin: "5px 0" }}>{product.name}</div>
                        <div>
                          <Rating value={product.ratings[0]?.star?.toFixed(1) || 0 }/>
                          &nbsp;&nbsp;
                          <span
                            style={{
                              color: "#777",
                              fontWeight: "500",
                              fontSize: "12px",
                            }}
                          >
                            ({product.totalreview})
                          </span>
                        </div>
                        <Price value={product.price} />
                      </div>
                    </Link>
                  );
                }
              })}
            </div>
          </Card>
        );
      })}
    </>
  );

};
