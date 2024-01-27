import React from "react";
import { Navigate } from "react-router-dom";
import AuthModal from "../customer/Auth/AuthModal";
import { Footer } from "../customer/components/Footer/Footer";
function Protected({ isSignedIn, setModal, children }) {
  if (!isSignedIn) {
    return <Navigate to={"/login"} state={{ modal: true }} replace></Navigate>;
  }
  return children;
}
export default Protected;
