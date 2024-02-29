import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';
import  __dirname  from "../utils.js"

const products = new ProductManager(__dirname+'/data/productos.json')
const vistasRouter = Router()


vistasRouter.get("/",async(req,res)=>{
    const listadeproductos=await products.getProducts()
    res.render("home",{listadeproductos})
})

vistasRouter.get("/realtimeproducts",(req,res)=>{
res.render("realTimeProducts")
})


export default vistasRouter