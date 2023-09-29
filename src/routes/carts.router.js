import { Router } from "express"
import CartManager from "../manger/CartManager.js"
import { __dirname } from "../util.js";
import path from "node:path";


const router = Router();
const cartsPath = path.join(__dirname, './files/carts.json');
const cartManager = new CartManager(cartsPath);

//Endpoint que crea un carrito
router.post('/', async (req, res) =>{
    await cartManager.addCart();
    res.send({status: 'succes', payload: 'Carrito creado'})
});

//Endpoint que muestra un carrito
router.get('/:cid', async (res, req) => {
    const cart = Number(req.params.cid)
    const products = await cartManager.getCartById(cart).products;
    if(products){
        res.send({status: 'succes', payload: products});
    }else{
        res.status(404).send({message: 'carrito no encontrado'})
    }
    
});

//Endpoint que agrega un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    const cart = Number(req.params.cid);
    const product = Number(req.params.pid);
    const updateResault = await cartManager.updateCart(cart, product);
    if(updateResault){
        res.send({ status: 'success', message: 'Producto Agregado'});
    }else{
        res.status(404).send({message: 'carrito no encontrado'})
    }

});


export default router;