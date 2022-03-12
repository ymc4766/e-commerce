import { combineReducers } from "redux";
import { cartReducer } from "./cartReducer";
import {
  allOrderListReducer,
  myOrderListReducer,
  orderCreateReducer,
  orderDeliverReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./orderReducers";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDetailsReducer,
  productListReducer,
  productRemoveReducer,
  productTopRatedReducer,
  productUpdateReducer,
} from "./productReducer";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./userReducers";

export default combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productRemoveReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  myOrderList: myOrderListReducer,
  orderList: allOrderListReducer,
});
