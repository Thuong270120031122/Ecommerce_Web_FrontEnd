import { Adjust } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const OrderCard = (props) => {
  const navigate = useNavigate();
  const param = useParams();
  console.log(props.data);
  return (
    <div
      onClick={() => navigate(`/account/order/${props.data.id}`)}
      className="p-5 shadow-md shadow-black hover:shadow-2xl "
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className=" flex cursor-pointer">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top "
              src={props.data.orderItems[0].product.imageUrl}
              alt=""
            />
            <div className="ml-5 space-y-2">
              <p> {props.data.orderItems[0].product.title}</p>
              <p className="opacity-50 text-xs font-semibold">
                Memory:{props.data.orderItems[0].memory}
              </p>
              <p className="opacity-50 text-xs font-semibold">
                Color: {props.data.orderItems[0].product.color}
              </p>
            </div>
          </div>
        </Grid>

        <Grid item xs={2}>
          <p>{props.data.totalDiscountedPrice}$</p>
        </Grid>

        <Grid item xs={4}>
          {true && (
            <p>
              <Adjust
                className="color-green-700"
                sx={{ width: "15px", height: "15px" }}
              ></Adjust>
              <span>Delivered </span>
            </p>
          )}
          <p>Your Item Has Been Delivered</p>

          {false && (
            <p>
              <span>Expected Delivery on Thursday</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
