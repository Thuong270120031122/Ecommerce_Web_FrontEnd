import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import Cart from "../Cart/Cart";
import { Button } from "@mui/material";
import CartItem from "../Cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../../../State/Order/Action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const { order } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);
  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-sm border">
        <AddressCard address={order.order?.shippingAddress}></AddressCard>
      </div>
      <div>
        <div className="lg:grid grid-cols-3 relative">
          <div className="col-span-2">
            {order.order?.orderItems.map((item) => (
              <CartItem item={item}></CartItem>
            ))}
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price Details
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-10 mx-5">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>{order.order?.totalPrice}$</span>
                </div>

                <div className=" flex justify-between pt-3 text-black">
                  <span>Discount</span>
                  <span className="text-green-600">
                    {order.order?.discount}$
                  </span>
                </div>

                <div className="flex justify-between pt-3 text-black">
                  <span>Delivery Charge</span>
                  <span className="text-green-600">Free</span>
                </div>
                <hr />
                <div className="flex justify-between pt-3 text-black">
                  <span>Total amount</span>
                  <span className="text-green-600">
                    {order.order?.totalDiscountedPrice}$
                  </span>
                </div>
              </div>

              <Button
                variant="contained"
                onClick={() => navigate(`/account/order/${orderId}`)}
                className="w-full mt-5"
                sx={{ px: "2rem", py: ".7rem", bgcolor: "#9155fd" }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
