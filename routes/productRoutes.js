import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  addProduct,
  deleteProductById,
  editProductById,
  getProductById,
  getProducts,
  getProductsByCategory,
} from "../controllers/productControllers.js";

export const productRouter = express.Router();

productRouter.post("/add-product", verifyToken, addProduct);

productRouter.delete("/product/:productId", verifyToken, deleteProductById);

productRouter.get("/products", verifyToken, getProducts);

productRouter.get("/products/:productId", verifyToken, getProductById);

productRouter.get("/products/category/:categoryId", getProductsByCategory);

productRouter.put("/products/:productId", verifyToken, editProductById);
