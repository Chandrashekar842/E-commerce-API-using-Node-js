import express from 'express'
import { addCategory, getCategories, deleteCateoryById, editCategoryById } from '../controllers/categoryControllers.js' 

export const categoryRouter = express.Router()

categoryRouter.post('/add-category', addCategory)

categoryRouter.get('/category', getCategories)

categoryRouter.delete('/category/:id', deleteCateoryById)

categoryRouter.put('/category/:id', editCategoryById)
