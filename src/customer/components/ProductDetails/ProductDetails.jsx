import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import ProdcutReviewCard from "./ProdcutReviewCard";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductByCategory,
  findProductsById,
} from "../../../State/Products/Action";
import { addItemToCart } from "../../../State/Cart/Action";
import { HomeSectionCarousel } from "../HomeSectionCarousel/HomeSectionCarousel";
import { Footer } from "../Footer/Footer";
import { changeCategory } from "../pages/HomePage/HomePage";
import AuthModal from "../../Auth/AuthModal";
import { showAlert } from "../../../State/Alert/Action";

const product = {
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],

  highlights: [
    "Affordable Price",
    "High Performance",
    "Long-Term Warranty",
    "High Technology",
  ],
  details: "The product with multifunctionality.",
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedMemory, setSelectedMemory] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const { product: product1, auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const handlerAddToCart = () => {
    if (selectedMemory === "") {
      dispatch(showAlert("Please select memory", "warning"));
    } else {
      const data = { productId: params.productId, memory: selectedMemory };
      dispatch(addItemToCart(data));
      navigate("/cart");
    }
  };

  const breadcrumbs = [
    { id: 1, name: "Home", href: "/" },
    {
      id: 2,
      name: `${product1.product?.category?.parentCategory?.name}`,
      href: `/product/${product1?.product?.category?.parentCategory?.name}/${product1?.product?.category?.parentCategory?.name}`,
    },
  ];
  console.log(breadcrumbs[1]);
  console.log(product1[breadcrumbs[1].name]);

  useEffect(() => {
    dispatch(findProductsById(params.productId));
    dispatch(findProductByCategory(changeCategory(breadcrumbs[1].name)));
    window.scrollTo(0, 0);
  }, [params.productId]);
  return (
    <div>
      <div className="bg-white lg:px-20">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center cursor-pointer">
                    <a
                      onClick={() => navigate(`${breadcrumb.href}`)}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a
                  href={product.href}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product1?.product?.title}
                </a>
              </li>
            </ol>
          </nav>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
            {/* Image gallery */}
            <div className="flex flex-col items-center">
              <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={product1.product?.imageUrl}
                  alt={"product"}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="flex flex-wrap space-x-5 justify-center">
                {product.images.map((image) => (
                  <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                    <img
                      src={product1.product?.imageUrl}
                      alt={product1.product?.imageUrl}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product info */}
            <div className="lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                  {product1?.product?.title}
                </h1>
                <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                  {product1?.product?.brand}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="flex space-x-5 item-center text-lg lg:text-xl text-gray-900 mt-6">
                  <p className="font-semibold">
                    {product1?.product?.discountedPrice}
                  </p>
                  <p className="opacity-50 line-through">
                    {product1?.product?.price}
                  </p>
                  <p className="text-green-600 font-semibold">
                    {product1?.product?.discountPercent}% Off
                  </p>
                </p>

                {/* Reviews */}
                <div className="mt-6">
                  <div className="flex items-center space-x-3">
                    <Rating name="read-only" value={5.5} readOnly></Rating>
                    <p className="opacity-50 text-sm">9999 Ratings</p>
                    <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indio-500">
                      3333 Reviews
                    </p>
                  </div>
                </div>

                <form className="mt-10">
                  {/* Colors */}
                  {/* <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div> */}

                  {/* Sizes */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Memory storage
                      </h3>
                      {/* <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a> */}
                    </div>

                    <RadioGroup
                      value={selectedMemory}
                      onChange={setSelectedMemory}
                      className="mt-4"
                      required
                    >
                      <RadioGroup.Label className="sr-only">
                        Choose a size
                      </RadioGroup.Label>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-6">
                        {product1?.product?.memories?.map((memory) => (
                          <RadioGroup.Option
                            key={memory.name}
                            value={memory.name}
                            disabled={memory.quantity <= 0}
                            className={({ active }) =>
                              classNames(
                                memory.quantity > 0
                                  ? "cursor-pointer bg-white text-gray-900 shadow-sm h-[2rem] "
                                  : "cursor-not-allowed bg-gray-50 text-gray-200",
                                active ? "ring-2 ring-indigo-500" : "",
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="span">
                                  {memory.name}
                                </RadioGroup.Label>
                                {memory.quantity > 0 ? (
                                  <span
                                    className={classNames(
                                      active ? "border" : "border-2",
                                      checked
                                        ? "border-indigo-500"
                                        : "border-transparent",
                                      "pointer-events-none absolute -inset-px rounded-md"
                                    )}
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <span
                                    aria-hidden="true"
                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                  >
                                    <svg
                                      className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                      viewBox="0 0 100 100"
                                      preserveAspectRatio="none"
                                      stroke="currentColor"
                                    >
                                      <line
                                        x1={0}
                                        y1={100}
                                        x2={100}
                                        y2={0}
                                        vectorEffect="non-scaling-stroke"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>

                  <Button
                    onClick={handlerAddToCart}
                    variant="contained"
                    sx={{
                      px: "2rem",
                      py: "1rem",
                      mt: "2rem",
                      bgcolor: "#9155fd",
                    }}
                  >
                    ADD TO CART
                  </Button>
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product1?.product?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3>

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-400">
                          <span className="text-gray-600">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">{product.details}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==========RATING AND REVIEW ============ */}
          <section>
            <h1 className="font-semibold text-lg pb-4">
              {" "}
              Recent Reviews and Rating
            </h1>
            <div className="border p-5">
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <div className="space-y-5">
                    {[1, 1, 1, 1, 1].map((item) => (
                      <ProdcutReviewCard></ProdcutReviewCard>
                    ))}
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <h1 className="text-xl font-semibold pb-2">
                    Product Ratings
                  </h1>
                  <div className="flex items-center space-x-3">
                    <Rating value={4.6} precision={0.5} readOnly></Rating>
                    <p className="opacity-60">92392 Ratings</p>
                  </div>

                  <Box className="mt-5 space-y-2">
                    <Grid container alignItems="center" gap={2}>
                      <Grid item xs={2}>
                        <p>Excellent</p>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={40}
                          color="success"
                        />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" gap={2}>
                      <Grid item xs={2}>
                        <p>Very good</p>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={30}
                          color="primary"
                        />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" gap={2}>
                      <Grid item xs={2}>
                        <p>Good</p>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={25}
                          color="secondary"
                        />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" gap={2}>
                      <Grid item xs={2}>
                        <p>Avarage</p>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={20}
                          color="warning"
                        />
                      </Grid>
                    </Grid>

                    <Grid container alignItems="center" gap={2}>
                      <Grid item xs={2}>
                        <p>Poor</p>
                      </Grid>
                      <Grid item xs={7}>
                        <LinearProgress
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={10}
                          color="error"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </section>

          {/*================== SIMILER PRODUCTS =========  */}
          <section className="pt-10">
            <h1 className="py-5 text-xl font-bold">Similer Products</h1>

            <HomeSectionCarousel
              data={product1[breadcrumbs[1].name]}
            ></HomeSectionCarousel>
          </section>
        </div>
      </div>
    </div>
  );
}
