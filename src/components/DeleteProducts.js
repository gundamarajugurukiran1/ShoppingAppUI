import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { BsFillPersonPlusFill } from "react-icons/bs";

import styles from "./styles/SignUp.module.css";
import Container from "react-bootstrap/esm/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function DeleteProducts() {
  
  let navigate = useNavigate();

  const schema = yup.object().shape({
    id: yup.number().required(),
    productName: yup.string().required(),
  });

  async function postDeleteProductInfo(inputData) {
    try{
    const response = await axios({
      method: "delete",
      mode: 'no-cors',
      url: "/app2/api/v1.0/Shopping/"+inputData.productName+"/delete/"+inputData.id,
      data: {
        id: inputData.id,
        productName: inputData.productName,
      },
      headers:{
        Authorization: "Bearer "+localStorage.getItem("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    }
    });
    
    
    if (response.data !== null && response.status !== 200) {
      showWarningToast(response.data.message);      
    }

    if (response.data!== null && response.status === 200) {
      navigate("/adminhome");
    }
  }
  catch(error){
    showWarningToast(error.response.data.message); 
  }
  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <Container fluid className={styles.container}>
      <ToastContainer />
      <Formik
        validationSchema={schema}
        initialValues={{
            id: "",
            productName: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);
          postDeleteProductInfo(values);
          setSubmitting(false);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          touched,
          isInValid,
          errors,
        }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            className={styles.formContainer}
          >
            <Row className="mb-5 text-center">
              <h1 className="text-success">Delete Products</h1>
              </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="id">
                <Form.Label>Product ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  value={values.id}
                  onChange={handleChange}
                  isInvalid={touched.id && errors.id}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your product ID
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  isInvalid={touched.productName && errors.productName}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your product name
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Delete Product 
            </Button>
             {/* <h4 className="text-warning" >Do you have already an account <Link to="/signin" className={styles.linkTextFormat} >Click Here</Link> </h4>  */}
                  
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default DeleteProducts;