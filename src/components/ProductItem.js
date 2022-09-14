import React from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import {Row } from "react-bootstrap";

function ProductItem(props) {
    return (
      <div className="border shadow rounded-3 border-primary p-3 mt-3">
        <Row>
          <div className="d-flex align-items-center mb-3">
            <div className="mx-3">
              <Hashicon value={props.productName} size={50} />
            </div>
            <div className="d-flex flex-column">
            <div className="fw-bold">{props.productName}</div>
            
            </div>
          </div>
          <div className="mx-3">
            <h6><b>product Name: </b> {props.productName} </h6>
          </div>
          <div className="mx-3">
              <h6><b>product Description: </b>{props.productDescription}</h6>
          </div>
          <div className="mx-3">
              <h6><b>price: </b>{props.price}</h6>
          </div>
          <div className="mx-3">
              <h6><b>features: </b>{props.features}</h6>
          </div>
          <div className="mx-3">
              <h6><b>product Quantity: </b>{props.productQuantity}</h6>
          </div>
          <div className="mx-3">
              <h6><b>product Status: </b>{props.productStatus}</h6>
          </div>
        </Row>
      </div>
      
    );
  }


export default ProductItem;
