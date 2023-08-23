import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupee } from "@fortawesome/free-solid-svg-icons";

import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { getProductBySlug } from "../../../actions";

/**
 * @author
 * @function ClothingAndAccessories
 **/

 const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();

  let params =useParams();
  useEffect(() => {

    dispatch(getProductBySlug(params.slug))
  }, [dispatch]);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product) => (
          <div className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicUrl(product.productPictures[0].img)} />
            </Link>
            <div>
              <div className="caProductName">{product.name}</div>
              <div className="caProductPrice">
              <FontAwesomeIcon icon={faRupee}></FontAwesomeIcon>:
                {product.price}
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
