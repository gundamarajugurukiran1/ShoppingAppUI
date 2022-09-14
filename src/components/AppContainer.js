import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import SignIn from "./SignIn";
import SignInAdmin from "./SignInAdmin";
import SignUp from "./SignUp";
import UnauthorizedPage from "./UnauthorizedPage";
import ForgotPassword from "./ForgotPassword";
import ShoppingHome from "./ShoppingHome";
import ShoppingHomeAdmin from "./ShoppingHomeAdmin";
import AllProducts from "./AllProducts";
import AddProducts from "./AddProducts";
import UpdateProducts from "./UpdateProducts";
import DeleteProducts from "./DeleteProducts";

function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/adminsignin" element={<SignInAdmin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />}/>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/adminhome" element={<ShoppingHomeAdmin />} >
          <Route path="allProducts" element={<AllProducts />} />
          <Route path="addProducts" element={<AddProducts />} />
          <Route path="updateProducts" element={<UpdateProducts />} />
          <Route path="deleteProducts" element={<DeleteProducts />} />
        </Route>
        <Route path="/home" element={<ShoppingHome />} >
           <Route path="allProducts" element={<AllProducts />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />        
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;