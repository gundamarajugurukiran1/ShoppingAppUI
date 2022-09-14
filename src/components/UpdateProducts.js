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

function UpdateProducts() {
  
  let navigate = useNavigate();

  const schema = yup.object().shape({
    id: yup.number().required(),
    productName: yup.string().required(),
    productDescription: yup.string().required(),
    price: yup.number().required(),
    features: yup.string().required(),
    productQuantity: yup.number().required(),
  });

  async function postUpdateProductInfo(inputData) {
    try{
    const response = await axios({
      method: "put",
      mode: 'no-cors',
      url: "/app2/api/v1.0/Shopping/"+inputData.productName+"/update/"+inputData.id,
      data: {
        id: inputData.id,
        productName: inputData.productName,
        productDescription: inputData.productDescription,
        price: inputData.price,
        features: inputData.features,
        productQuantity: inputData.productQuantity
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
            productDescription: "",
            price: "",
            features: "",
            productQuantity:"",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // console.log(values);
          postUpdateProductInfo(values);
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
              <h1 className="text-success">Update Products</h1>
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
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="productDescription">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  type="text"
                  name="productDescription"
                  value={values.productDescription}
                  onChange={handleChange}
                  isInvalid={touched.productDescription && errors.productDescription}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your product description
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="price">
                <Form.Label>price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  isInvalid={touched.price && errors.price}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter price
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="features">
                <Form.Label>features</Form.Label>
                <Form.Control
                  type="text"
                  name="features"
                  value={values.features}
                  onChange={handleChange}
                  isInvalid={touched.features && errors.features }
                />

                <Form.Control.Feedback type="invalid">
                  Please enter product features
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="productQuantity">
                <Form.Label>Product Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="productQuantity"
                  value={values.productQuantity}
                  onChange={handleChange}
                  isInvalid={touched.productQuantity && errors.productQuantity}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter product quantity
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit" variant="success">
              Update Product 
            </Button>
             {/* <h4 className="text-warning" >Do you have already an account <Link to="/signin" className={styles.linkTextFormat} >Click Here</Link> </h4>  */}
                  
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default UpdateProducts;