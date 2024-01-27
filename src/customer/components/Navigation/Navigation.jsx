import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../../Auth/AuthModal";
import Logo from "../../../public/image/Logo.png";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemIcon,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout } from "../../../State/Auth/Action";
import { deepPurple } from "@mui/material/colors";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import React from "@heroicons/react";
import { findProductsByName } from "../../../State/Products/Action";
import { getCart } from "../../../State/Cart/Action";

const navigation = {
  categories: [
    {
      id: "Product",
      name: "Product",
      featured: [
        {
          name: "New phone",
          href: "product/phone/phone",
          imageSrc:
            "https://cdn.multitronic.fi/images/prod/8/B/MPVN3QN-A-10.jpg",
          imageAlt: "iphone",
        },
        {
          name: "New model laptop",
          href: "product/laptop/laptop",
          imageSrc:
            "https://www.telegraph.co.uk/content/dam/recommended/2023/07/07/TELEMMGLPICT000341883746_16887389431030_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=680",
          imageAlt: "new model laptop",
        },
      ],
      sections: [
        {
          id: "Phone",
          name: "Phone",
          items: [
            {
              name: "Samsung",
              value: "Samsung",
              href: "/product/phone/samsung",
            },
            { name: "Apple", value: "Apple", href: "/product/phone/apple" },
            { name: "Xiaomi", value: "Xiaomi", href: "/product/phone/xiaomi" },
            { name: "Oppo", value: "Oppo", href: "/product/phone/oppo" },
          ],
        },
        {
          id: "Laptop",
          name: "Laptop",
          items: [
            { name: "Asus", value: "AsusLap", href: "/product/laptop/asus" },
            { name: "Dell", value: "DellLap", href: "/product/laptop/dell" },
            { name: "Apple", value: "AppleLap", href: "/product/laptop/apple" },
          ],
        },

        {
          id: "Tablet",
          name: "Tablet",
          items: [
            { name: "Lenovo", value: "Lenovotablet", href: "#" },
            { name: "Samsung", value: "samsungtablet", href: "#" },
            { name: "Apple", value: "Appletablet", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Stores", href: "product" },
    { name: "About", href: "about" },
    { name: "Contact", href: "contact" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem("jwt");
  const { auth, cart, product } = useSelector((store) => store);
  console.log(product);
  const dispatch = useDispatch();

  const handleUSerClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = (e) => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setOpenAuthModal(true);
  };
  const handleClose = () => {
    setOpenAuthModal(false);
  };

  const handleCategoryClick = (category, section, item, close) => {
    const itemName = item ? item.value : section.name;
    navigate(`/${category.id}/${section.id}/${itemName}`);
    close();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseUserMenu();
  };

  const [searchTerm, setSearchTerm] = useState(" ");
  const [isInputActive, setIsInputActive] = useState(false);

  const handleSearch = () => {
    console.log(searchTerm);
    navigate(`/product`);
    setSearchTerm(searchTerm);
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
      dispatch(getCart(jwt));
    }
  }, [jwt, auth?.jwt, auth?.user?.firstName]);

  useEffect(() => {
    if (auth.user) {
      handleClose();
    }
    if (location.pathname === "/login" || location.pathname === "/register") {
      navigate(-1);
    }
  }, [auth?.user]);

  useEffect(() => {
    const data = {
      title: searchTerm,
    };
    dispatch(findProductsByName(data));
  }, [searchTerm]);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                onClick={() => navigate(`${item.href}`)}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    onClick={() => navigate(`${item.href}`)}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6 cursor-pointer">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        onClick={() => navigate(`${page.href}`)}
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div> */}

                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://tailwindui.com/img/flags/flag-canada.svg"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-50 ">
        <p className="flex h-10 items-center justify-center bg-blue-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav
          aria-label="Top"
          className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 border-b border-gray-200 shadow-sm"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div
                onClick={() => {
                  navigate("/");
                }}
                className="ml-4 flex lg:ml-0"
              >
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto" src={Logo} alt="" />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            onClick={() =>
                                              navigate(`${item.href}`)
                                            }
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900 cursor-pointer"
                                            onClick={() =>
                                              handleCategoryClick(
                                                category,
                                                section,
                                                null,
                                                close
                                              )
                                            }
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleCategoryClick(
                                                      category,
                                                      section,
                                                      item,
                                                      close
                                                    )
                                                  }
                                                  className="hover:text-gray-800 cursor-pointer"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      onClick={() => navigate(`/${page.href}`)}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 cursor-pointer"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Search */}
                <div className="flex lg:ml-6">
                  <div className="p-2 text-gray-400 hover:text-gray-500 group h-[45px]">
                    <div className="flex">
                      <span className="sr-only">Search</span>
                      <input
                        value={searchTerm}
                        onClick={() => setIsInputActive(true)}
                        onBlur={() => {
                          setTimeout(() => {
                            setIsInputActive(false);
                          }, 1000);
                        }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" w-[10rem]
                          bg-white border border-gray-500  border-5 rounded-lg px-1 font-semibold text-black"
                      ></input>

                      <MagnifyingGlassIcon
                        className="h-6 w-6 group/search hover:text-gray-600 bg-white rounded-lg"
                        aria-hidden="true"
                        onClick={handleSearch}
                      />
                    </div>
                    {isInputActive && (
                      <ul className="border border-2 shadow-md max-h-[300px] overflow-y-scroll rounded-md  w-[10rem]">
                        {product?.products?.content.map((result) => (
                          <li key={result.id}>
                            <div
                              className="w-[100%] bg-gray-200 hover:bg-gray-300 text-black py-2 px-2 font-semibold"
                              onClick={() => navigate(`/product/${result.id}`)}
                            >
                              {result.title}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {/* UseName Menu */}
                  {auth?.user?.firstName ? (
                    <div className="hidden lg:ml-8 lg:flex">
                      <Avatar
                        className="text-white"
                        onClick={handleUSerClick}
                        aria-aria-controls={open ? "basic-menu" : undefined}
                        aria-aria-haspopup="true"
                        aria-aria-expanded={open ? "true" : undefined}
                        sx={{
                          bgcolor: deepPurple[500],
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        {auth?.user?.firstName[0].toUpperCase()}
                      </Avatar>

                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openUserMenu}
                        onClose={handleCloseUserMenu}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => navigate("/account/order")}>
                          My Orders
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </div>
                  ) : (
                    <Button
                      onClick={handleOpen}
                      className="text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </Button>
                  )}
                </div>

                {/* Cart */}
                <div
                  className="ml-4 flow-root lg:ml-6"
                  onClick={() =>
                    jwt ? navigate("/cart") : setOpenAuthModal(true)
                  }
                >
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {auth?.user && cart?.cart?.totalItem}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <AuthModal handleClose={handleClose} open={openAuthModal}></AuthModal>
    </div>
  );
}
