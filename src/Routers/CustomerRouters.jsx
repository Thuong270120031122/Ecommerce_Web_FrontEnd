import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  redirect,
  useNavigate,
} from "react-router-dom";
import { HomePage } from "../customer/components/pages/HomePage/HomePage";
import Cart from "../customer/components/Cart/Cart";
import Navigation from "../customer/components/Navigation/Navigation";
import Product from "../customer/components/Product/Product";
import ProductDetails from "../customer/components/ProductDetails/ProductDetails";
import Checkout from "../customer/components/Checkout/Checkout";
import Order from "../customer/components/Order/Order";
import OrderDetails from "../customer/components/Order/OrderDetails";
import LoginForm from "../customer/Auth/LoginForm";
import RegisterForm from "../customer/Auth/RegisterForm";
import { Footer } from "../customer/components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../State/Auth/Action";
import AuthModal from "../customer/Auth/AuthModal";
import Protected from "./Protected";
import Contact from "../customer/components/Contact/Contact";
import { AlertCard } from "../customer/components/Alert/Alert";

const CustomerRouters = () => {
  const jwt = localStorage.getItem("jwt");
  const { auth, alert } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate;
  console.log(alert);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser());
    }
  }, [auth.jwt, dispatch, jwt]);

  useEffect(() => {});
  return (
    <div>
      <div className="relative ">
        <Navigation></Navigation>
        <AlertCard
          message={alert.message}
          state={alert.type}
          openAlert={alert.isVisible}
        ></AlertCard>
      </div>

      <Routes>
        <Route path="/login" element={<HomePage></HomePage>}></Route>
        <Route path="/register" element={<HomePage></HomePage>}></Route>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/product/:productId"
          element={<ProductDetails></ProductDetails>}
          exact
        ></Route>
        <Route path="/product" element={<Product></Product>} exact></Route>
        <Route
          path="/:levelOne/:LevelTwo/:LevelThree"
          element={<Product></Product>}
        ></Route>

        <Route path="/about" element={<HomePage></HomePage>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>

        <Route
          path="/cart"
          element={
            <Protected isSignedIn={jwt}>
              <Cart></Cart>
            </Protected>
          }
        ></Route>
        <Route
          path="/checkout"
          element={
            <Protected isSignedIn={jwt}>
              <Checkout></Checkout>
            </Protected>
          }
        ></Route>

        <Route
          path="/account/order"
          element={
            <Protected isSignedIn={jwt}>
              <Order></Order>
            </Protected>
          }
        ></Route>

        <Route
          path="/account/order/:orderId"
          element={
            <Protected isSignedIn={jwt}>
              <OrderDetails></OrderDetails>
            </Protected>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
};

export default CustomerRouters;
