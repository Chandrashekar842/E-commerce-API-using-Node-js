import express from 'express'
import { postSignUp, postLogin } from '../controllers/authControllers.js'

export const authRouter = express.Router()

authRouter.post('/signup', postSignUp)

authRouter.post('/login', postLogin)