import React from "react";
import Layout from "../../components/Layout";
import { ProductStore } from "./ProductStore";
import { ProductPage } from "./ProductPage";
import getParams from "../../utils/getParams";
import "./style.css";
import { useLocation } from "react-router-dom";
import ClothingAndAccessories from "./ClothingAndAccessories";

/**
 * @author
 * @function ProductListPage
 **/

const ProductListPage = (props) => {
  const location = useLocation();
  const renderProduct = () => {
    console.log(props, "hamza");
    const params = getParams(location.search);

    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;

      case "page":
        content = <ProductPage {...props} />;
        break;

      default:
        content = <ClothingAndAccessories {...props}/>;
    }

    return content;
  };

  return (
    <>
      <Layout>{renderProduct()}</Layout>;
    </>
  );
};

export default ProductListPage;
