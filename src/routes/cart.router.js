import express from "express";
const cartRouter = express.Router();
import  errorHandler  from "../middlewares/error.js"
import {
    getCarts,
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    updateCart,
    updateProductQuantity,
    emptyCart
} from "../controllers/cart.controller.js";

import { purchase } from "../controllers/ticket.controller.js";

cartRouter.get("/", getCarts);
cartRouter.post("/", createCart);
cartRouter.get("/:cid", getCartById);
cartRouter.put("/:cid", updateCart);
cartRouter.delete("/:cid", emptyCart);
cartRouter.post("/:cid/product/:pid", addProductToCart);
cartRouter.delete('/:cid/product/:pid', deleteProductFromCart);
cartRouter.put("/:cid/product/:pid", updateProductQuantity);
cartRouter.post("/:cid/purchase", purchase);

cartRouter.use(errorHandler);

export default cartRouter;