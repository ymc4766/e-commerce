import {
  ALL_ORDER_LIST_FAIL,
  ALL_ORDER_LIST_REQ,
  ALL_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQ,
  MY_ORDER_LIST_RESET,
  MY_ORDER_LIST_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQ,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQ,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQ,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQ,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../actions/types";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQ:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  loading: true,
  orderItems: [],
  shippingAddres: {},
};

export const orderDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQ:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQ:
      return { loading: true };
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const myOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_LIST_REQ:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MY_ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const allOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ALL_ORDER_LIST_REQ:
      return { loading: true };
    case ALL_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ALL_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQ:
      return { loading: true };
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
