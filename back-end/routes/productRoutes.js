import express from "express";
import {
  createProduct,
  createProductReviews,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProducts,
  updateProduct,
} from "../controllers/productControler.js";
import { admin, protect } from "../middleWare/authMiddleware.js";

const router = express.Router();

// router.route("/").get(getProducts);
// router.get("/", getProducts);
router.route("/").get(getProducts).post(protect, admin, createProduct);

router.route("/:id/reviews").post(protect, createProductReviews);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router.get("/top/:top", getTopProducts);

export default router;
