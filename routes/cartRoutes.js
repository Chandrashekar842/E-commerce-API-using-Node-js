import express from 'express'
import { deleteProductFromCart, getCart, postCart } from '../controllers/cartControllers.js'
import { verifyToken } from '../middleware/authMiddleware.js'

export const cartRouter = express.Router()

cartRouter.post('/add-to-cart',verifyToken, postCart)

cartRouter.get('/cart', verifyToken, getCart)

cartRouter.delete('/cart/:productId', verifyToken, deleteProductFromCart)