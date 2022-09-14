import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../feature/Products/ProductSlice";
import ProductItem from "./ProductItem";

function AllProducts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeProducts = useSelector(
    (state) => state.ProductReducer.Products
  );

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/unauthorized");
    }
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <h1>Items</h1>
      {storeProducts ? (
        storeProducts.map((Products) => {
          if(Products.productName===localStorage.getItem("productName")){
          return (
            <ProductItem
              key={Products.id}
              id={Products.id}
              productName={Products.productName}
              productDescription={Products.productDescription}
              price={Products.price}
              features={Products.features}
              productQuantity={Products.productQuantity}
              productStatus={Products.productStatus}
            />
          );
          }
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default AllProducts;
