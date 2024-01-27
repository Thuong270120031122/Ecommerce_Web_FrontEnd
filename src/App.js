import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./customer/components/Cart/Cart";
import Checkout from "./customer/components/Checkout/Checkout";
import { Footer } from "./customer/components/Footer/Footer";
import { HomeCarosel } from "./customer/components/HomeCarousel/HomeCarousel";
import { HomeSectionCarosel } from "./customer/components/HomeSectionCarousel/HomeSectionCarousel";
import Navigation from "./customer/components/Navigation/Navigation";
import Order from "./customer/components/Order/Order";
import OrderDetails from "./customer/components/Order/OrderDetails";
import Product from "./customer/components/Product/Product";
import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import { HomePage } from "./customer/components/pages/HomePage/HomePage";
import CustomerRouters from "./Routers/CustomerRouters";

function App() {
  return (
    <div className=" ">
      <Routes>
        <Route path="/*" element={<CustomerRouters></CustomerRouters>}></Route>
      </Routes>
    </div>
  );
}

export default App;
