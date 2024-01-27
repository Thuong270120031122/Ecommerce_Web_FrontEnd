import React, { useEffect } from "react";
import AddressCard from "../AddressCard/AddressCard";
import OrderTracker from "./OrderTracker";
import { Box, Grid } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Star, StarBorder, Start } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";

const OrderDetails = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  console.log(order);
  useEffect(() => {
    dispatch(getOrderById(parseInt(param.orderId)));
  }, [param.orderId]);
  return (
    <div className="px-5 lg:px-20">
      <div>
        <h1 className="font-bold text-lg py-10">Delivery Address</h1>
        <AddressCard address={order?.order?.shippingAddress}></AddressCard>
      </div>

      <div className="py-20">
        <OrderTracker activeStep={1}></OrderTracker>
      </div>

      <Grid className="space-y-5" container>
        {order?.order?.orderItems?.map((item) => (
          <Grid
            item
            container
            className="shadow-xl rounded-md p-5 border "
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product.imageUrl}
                  alt=""
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">{item.product.title}</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: {item.product.color}</span>
                    <span>Memory: {item.memory}</span>
                    <span>Quantity: {item.quantity}</span>
                  </p>
                  <p>Seller: {item.product.brand}</p>
                  <p className="space-x-5">
                    <span className="text-green-500">
                      {item.discountedPrice}$
                    </span>
                    <span className="text-red-500 line-through">
                      {item.price}$
                    </span>
                  </p>
                </div>
              </div>
            </Grid>

            <Grid item>
              <Box sx={{ color: deepPurple[500] }}>
                <StarBorder
                  className="px-2 text-5xl"
                  sx={{ fontSize: "2rem" }}
                ></StarBorder>
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
