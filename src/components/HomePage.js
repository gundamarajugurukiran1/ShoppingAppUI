import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

import {
  BsFillBookFill,
  BsFillShareFill,
  BsFillPersonPlusFill,
  BsFillCpuFill
} from "react-icons/bs";

import { RiLoginBoxLine } from "react-icons/ri";

import styles from "./styles/HomePage.module.css";

import psnLogo from "./assets/psn-logo-large.png";


function HomePage() {
  const navigate = useNavigate();

  async function tokenValidate() {
    const response = await axios({
      method: "get",
      url: "/app1/api/v1.0/Shopping/validate",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(response);
    if (response.status !== 200) {
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("valid");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      tokenValidate()
      if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== "" && localStorage.getItem("valid") !== true)
        navigate("/home");
    }
  });

  return (
    <Container fluid>
      <Row className={styles.container}>
        <center>
            <Row>
              <h3 className="text-info">Create Account and Enjoy Shopping!!</h3>
            </Row>
        </center>
          <div className={styles.colWithButtons}>
            <fieldset class="border p-2 text-primary">Come Shop with us
              <legend class="w-auto">
                <Row>
                  <h5 className="text-success mb-3"></h5>
                </Row>{" "}
                <br />
                <Row>
                  <Link to="/signin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign In <RiLoginBoxLine /></Button></Link>
                </Row>
                <Row>
                  <Link to="/adminsignin" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Admin Sign In <RiLoginBoxLine /></Button></Link>
                </Row>
                <Row>
                  <Link to="/signup" className={styles.linkTextFormat}><Button variant="success" className={`${styles.btnHomePage} mb-3`}>Sign Up <BsFillPersonPlusFill /></Button></Link>
                </Row>
              </legend>
            </fieldset>
          </div>
      </Row>
    </Container>
  );
}

export default HomePage;