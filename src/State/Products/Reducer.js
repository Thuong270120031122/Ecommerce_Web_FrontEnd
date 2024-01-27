import {
  FIND_PRODUCTS_FAILURE,
  FIND_PRODUCTS_REQUEST,
  FIND_PRODUCTS_SUCCESS,
  FIND_PRODUCT_BY_CATEGORY_REQUEST,
  FIND_PRODUCT_BY_CATEGORY_SUCCESS,
  FIND_PRODUCT_BY_ID_FAILURE,
  FIND_PRODUCT_BY_ID_REQUEST,
  FIND_PRODUCT_BY_ID_SUCCESS,
  FIND_PRODUCT_BY_NAME_FAILURE,
  FIND_PRODUCT_BY_NAME_REQUEST,
  FIND_PRODUCT_BY_NAME_SUCCESS,
} from "./ActionType";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

export const customerProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_PRODUCTS_REQUEST:
    case FIND_PRODUCT_BY_ID_REQUEST:
    case FIND_PRODUCT_BY_NAME_REQUEST:
    case FIND_PRODUCT_BY_CATEGORY_REQUEST:
      return { ...state, loading: true, error: null };
    case FIND_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        product: action.payload,
      };

    case FIND_PRODUCT_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload,
      };

    case FIND_PRODUCT_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        [action.payload.category]: action.payload.data,
      };
    case FIND_PRODUCTS_FAILURE:
    case FIND_PRODUCT_BY_ID_FAILURE:
    case FIND_PRODUCT_BY_NAME_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
