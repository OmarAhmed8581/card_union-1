import React, { useEffect } from 'react';
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout , checkloginactive } from "../../actions/auth.actions";

/**
 * @author
 * @function Header
 **/

export const Header = (props) => {
  const auth = useSelector((state) => state.auth);




  // interval login check
  // checkloginactive(auth.user._id);
  const dispatch = useDispatch();
  useEffect(() => {
    // Initial check when the component mounts
    // dispatch(checkloginactive(auth.user._id));

    // Set an interval to check login activity periodically (e.g., every 5 seconds)
    const intervalId = setInterval(() => {
      console.log("test")
      // clearInterval(intervalId);
      dispatch(checkloginactive(auth.user._id));

    }, 30000); // 5000 milliseconds = 5 seconds

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [auth.user._id]); 




 
  const logout = () => {
    dispatch(signout(auth.user._id));
  };

  const renderLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={logout}
            style={{ cursor: "pointer" }}
          >
            SignOut
          </span>
        </li>
      </Nav>
    );
  };

  const renderNonLoggedInLinks = () => {
    return (
      <Nav>
        <li className="nav-item">
          <NavLink to={"/signin"} className="nav-link">
            SignIn
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={"/signup"} className="nav-link">
            SignUp
          </NavLink>
        </li>
      </Nav>
    );
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="lg"
        variant="dark"
        style={{ zIndex: 1, backgroundColor: "#071F45" }}
      >
        <Container fluid>
          {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}

          <Link to={"/"} className="navbar-brand">
            <div style={{ display: "flex" }}>
              {auth.user.fullName ? `${auth.user.fullName}` : "Admin Panel"}

              {auth.user.email == "muhammadhamza11@gmail.com" ? (
                <div
                  style={{
                    marginLeft: "45%",
                    position: "fixed",
                    fontWeight: "bolder",
                  }}
                >
                  <span style={{ color: "#FFA07A" }}>S</span>
                  <span style={{ color: "#FF4500" }}>U</span>
                  <span style={{ color: "#DA70D6" }}>P</span>
                  <span style={{ color: "#66CDAA" }}>E</span>
                  <span style={{ color: "#DAA520" }}>R</span>
                  <span style={{ color: "#D3D3D3" }}>-</span>
                  <span style={{ color: "#66CDAA" }}>A</span>
                  <span style={{ color: "#FFA07A" }}>D</span>
                  <span style={{ color: "#FF4500" }}>M</span>
                  <span style={{ color: "#DA70D6" }}>I</span>
                  <span style={{ color: "#66CDAA" }}>N</span>
                  
                </div>
              ) : (
                <div
                  style={{
                    marginLeft: "45%",
                    position: "fixed",
                    fontWeight: "bolder",
                  }}
                >
                  <span style={{ color: "#FFA07A" }}>S</span>
                  <span style={{ color: "#FF4500" }}>E</span>
                  <span style={{ color: "#DA70D6" }}>L</span>
                  <span style={{ color: "#66CDAA" }}>L</span>
                  <span style={{ color: "#DAA520" }}>E</span>
                  <span style={{ color: "#D3D3D3" }}>R</span>
                  <span style={{ color: "#66CDAA" }}>-</span>
                  <span style={{ color: "#FFA07A" }}>C</span>
                  <span style={{ color: "#FF4500" }}>E</span>
                  <span style={{ color: "#DA70D6" }}>N</span>
                  <span style={{ color: "#66CDAA" }}>T</span>
                  <span style={{ color: "#DAA520" }}>E</span>
                  <span style={{ color: "#D3D3D3" }}>R</span>
                </div>
              )}
            </div>
          </Link>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
            </Nav>
            {auth.authenticate
              ? renderLoggedInLinks()
              : renderNonLoggedInLinks()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
