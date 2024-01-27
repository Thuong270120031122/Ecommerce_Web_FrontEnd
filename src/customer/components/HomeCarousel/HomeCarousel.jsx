import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCarouselData";
import { Button } from "@mui/material";

const items = homeCarouselData.map((item, index) => (
  <div className=" relative inline-block ">
    <div className="absolute top-[40%] left-[20%] w-[20rem] ">
      <h2 className=" font-thin"> UP to 50% discount!!</h2>
      <h1 className="text-3xl font-bold mb-5">
        Best sale with variety product!!
      </h1>
      <Button
        sx={{
          bgcolor: "#0661f4",
          color: "white",
          opacity: "50",
          "&:hover": {
            backgroundColor: "#3b82f6",
          },
        }}
        variant="outlined"
        size="large"
        href="/product"
      >
        Shop Now
      </Button>
    </div>
    <div className="h-[30rem] w-[100vw]">
      <img
        className="z-20 h-full w-full object-cover"
        role="presentation"
        src={item.image}
        alt=""
      />
    </div>
  </div>
));

const responsive = {
  0: { items: 1 },
  568: { items: 1 },
  1024: { items: 1 },
};
export const HomeCarousel = () => (
  <AliceCarousel
    mouseTracking
    touchTracking
    items={items}
    disableButtonsControls
    time
    autoPlay
    responsive={responsive}
    autoPlayInterval={1000}
    infinite
  />
);
