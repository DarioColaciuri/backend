import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { admin } from '../middlewares/auth.js';
import { getProducts, getCarts, getCartById, getProductById, realTimeProducts, chat, register, login, user } from "../controllers/vistas.controller.js"

const vistasRouter = Router()

vistasRouter.get("/products", auth, getProducts);
vistasRouter.get("/carts", auth, admin, getCarts);
vistasRouter.get("/carts/:cid", auth, admin, getCartById);
vistasRouter.get("/product/:pid", auth, getProductById)
vistasRouter.get("/realtimeproducts", auth, admin, realTimeProducts)
vistasRouter.get("/chat", chat)
vistasRouter.get('/register', register)
vistasRouter.get('/', login)
vistasRouter.get('/user', auth, user)

export default vistasRouter