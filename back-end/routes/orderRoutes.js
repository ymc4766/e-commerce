import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleWare/authMiddleware.js";

const router = express.Router();

// route /api/orders
//created in controller but protected here
//post the route but route /api/orders is in server.js
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

//get /api/orders/myorders route
router.route("/myorders").get(protect, getMyOrders);

// get orderbyId api/orders/:id and upadate to /pay
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

// //get /api/orders/myorders route
// router.route("/myorders").get(protect, getMyOrders);

export default router;
