import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupee , faArrowRight } from "@fortawesome/free-solid-svg-icons";

/**
 * @author
 * @function Price
 **/

const Price = (props) => {
  return (
    <div
      style={{
        fontSize: props.fontSize ? props.fontSize : "14px",
        fontWeight: "bold",
        margin: "5px 0",
      }}
    >
      <FontAwesomeIcon icon={faRupee} />&nbsp;
      <FontAwesomeIcon icon={faArrowRight} />&nbsp;
      {props.value}
    </div>
  );
};

export default Price;
