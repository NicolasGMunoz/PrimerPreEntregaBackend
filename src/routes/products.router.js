import { Router } from "express";
import ProductManager from '../manger/ProductManager.js'
import { __dirname } from '../util.js'
import path from 'node:path';


const router = Router();
const productsPath = path.join(__dirname, './files/products.json');
const productManager = new ProductManager(productsPath);

//Endpoint que muestra todos los productos y puede recibir un query param para mostrar menos productos si el cliente lo desea
router.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if(limit){
        let productsLimit = products.slice(0, limit)
        return res.send(productsLimit)
    }else{
        res.send(products)
    }
})

//Endpoint que muestra el producto segun el id
app.get('/products/:cid', async (req, res) =>{
    const product = await productManager.getProductById(Number(req.params.cid));
    res.send(product)
})

//Endpoint que crea un producto 
router.post('/', async (req, res) => {
    const product = req.body;
    await productManager.addProduct(product);
    res.send({ status: 'Success', payload: product });
});

//Endpoint que actualiza un producto


//Endpoint que elimina un producto
router.delete('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    await productManager.deleteProduct(id);

    res.send({ status: 'Success', payload: `Product N° ${id} deleted`});
});

export default router;