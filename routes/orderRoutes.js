import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getOrderDetailsById, getOrderHistory, postOrder } from "../controllers/orderControllers.js"; 

export const orderRouter = express.Router()

orderRouter.post('/place-order', verifyToken, postOrder)

orderRouter.get('/order/:orderId', verifyToken, getOrderDetailsById)

orderRouter.get('/orders', verifyToken, getOrderHistory)