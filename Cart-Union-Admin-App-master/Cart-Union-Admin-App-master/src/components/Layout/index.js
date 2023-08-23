import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Header } from "../Header";
import style from "./style.css";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <Header />
      {props.sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink to={`/`}>Home</NavLink>
                </li>
                <li>
                  <NavLink to={`/page`}>Page</NavLink>
                </li>
                <li>
                  <NavLink to={`/Sales`}>Sales</NavLink>
                </li>
                <li>
                  <NavLink to={`/Return`}>Return</NavLink>
                </li>
                <li>
                  <NavLink to={`/Statistical`}>Statistical Analyser</NavLink>
                </li>
                {auth.user.email == "muhammadhamza11@gmail.com" && (
                  <li>
                    <NavLink to={`/category`}>Category</NavLink>
                  </li>
                )}
                <li>
                  <NavLink to={`/products`}>Products</NavLink>
                </li>
                {
                  auth.user.email != "muhammadhamza11@gmail.com" && <li>
                  <NavLink to={`/orders`}>Orders</NavLink>
                  </li>
                }
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", padding: "60px" }}>
              {props.children}
            </Col>
          </Row>
        </Container>
      ) : (
        props.children
      )}
    </>
  );
};
export default Layout;
