import { Router } from 'express';
import ProductManager from '../dao/controllers/Mongo/productManagerMongo.js';
import  __dirname  from "../utils.js"

const products = new ProductManager()
const vistasRouter = Router()


vistasRouter.get("/",async(req,res)=>{
    const listadeproductos=await products.getProducts()
    res.render("home",{listadeproductos})
})

vistasRouter.get("/realtimeproducts",(req,res)=>{
res.render("realTimeProducts")
})

vistasRouter.get("/chat",(req,res)=>{
    res.render("chat")
})

export default vistasRouter