import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import logo from "./assets/psn-logo-large.png";
import axios from "axios";

import {
  RiHome3Fill,
  RiContactsBook2Fill,
  RiAccountCircleLine,
  RiRssFill,
  RiUserReceivedFill,
} from "react-icons/ri";

import styles from "./styles/NewsFeed.module.css";

function ShoppingHome() {
  let navigate = useNavigate();
  
  async function tokenValidate(){
    const response = await axios({
      method: "get",
      url: "/app1/api/v1.0/Shopping/validate",
      headers: {
        Authorization: "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(response);
    if(response.status!==200){
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("valid");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      navigate("/");
    }
  }

  function handleSignOut(e) {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("valid");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    navigate("/");
  }
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      tokenValidate()
    if (localStorage.getItem("token") === null && localStorage.getItem("valid")!==true) {
      navigate("/unauthorized");
    }
  }
  });

  return (
    <Container className="pt-3">
      <Row className="mb-3">
        <Col md={4}>
          <Row className="justify-content-center align-items-center">
            {/* <Col md="auto" className="text-sm-start text-center mb-sm-0 mb-3">
              <img src={logo} width="125" alt="logo" />
            </Col> */}
            <Col className="text-sm-start text-center text-dark mb-sm-0 mb-3">
              <h1>Shopping App</h1>
            </Col>
          </Row>
        </Col>
        
      </Row>
      <Row>
        <Col md={4}>
          <Navbar bg="light" expand="lg" className="mb-3 mb-sm-0">
            <Container className={styles.navbarContainer}>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className={styles.navContainer}>
                <ul className="list-group">
                <Nav.Link>
                  <Link to="" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-primary shadow">
                      <span>
                        {" "}
                        <RiHome3Fill /> Home
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="myorders" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-primary shadow">
                      <span>
                        <RiRssFill /> My Orders
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="allproducts" className="text-decoration-none">
                    <li className="list-group-item fs-5 py-3 text-primary shadow">
                      <span>
                        <RiContactsBook2Fill /> All Products
                      </span>
                    </li>
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <li
                    className={`list-group-item fs-5 py-3 text-primary shadow ${styles.signOutButton}`}
                    onClick={handleSignOut}
                  >
                    <span>
                      <RiUserReceivedFill /> Sign Out
                    </span>
                  </li>
                </Nav.Link>
                </ul>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
        <Col md={8}>
          <Outlet />{" "}
        </Col>
      </Row>
    </Container>
  );
}

export default ShoppingHome;
