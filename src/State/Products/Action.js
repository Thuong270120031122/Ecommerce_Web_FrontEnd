import { API_BASE_URL, api } from "../../config/apiConfig";
import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_CATEGORY_FAILURE,
  FIND_PRODUCT_BY_CATEGORY_REQUEST,
  FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_NAME_FAILURE,
  FIND_PRODUCT_BY_NAME_REQUEST,
  FIND_PRODUCT_BY_NAME_SUCCESS,
} from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCTS_REQUEST });
  const {
    color,
    memories,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;
  try {
    const { data } =
      await api.get(`/api/products?color=${color}&memories=${memories}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}                
    `);
    console.log(data);
    dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
  }
};

export const findProductsById = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });
  const productId = reqData;

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const findProductsByName = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_NAME_REQUEST });

  try {
    const { data } = await api.post(`/api/products/search`, reqData);

    dispatch({ type: FIND_PRODUCT_BY_NAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_NAME_FAILURE, payload: error.message });
  }
};

export const findProductByCategory = (reqData) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_CATEGORY_REQUEST });
  const {
    color,
    memories,
    minPrice,
    maxPrice,
    minDiscount,
    category,
    stock,
    sort,
    pageNumber,
    pageSize,
  } = reqData;

  try {
    const { data } =
      await api.get(`/api/products?color=${color}&memories=${memories}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}                
    `);
    console.log(data);
    dispatch({
      type: FIND_PRODUCT_BY_CATEGORY_SUCCESS,
      payload: { data, category },
    });
  } catch (error) {
    dispatch({
      type: FIND_PRODUCT_BY_CATEGORY_FAILURE,
      payload: error.message,
    });
  }
};
