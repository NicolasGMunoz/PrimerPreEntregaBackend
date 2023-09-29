import fs from 'fs';

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    //method of return json products
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data)
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    //method of create product and push to JSON
    addPorduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (products.some(p => p.code === product.code)) {
                return `El codigo de prodcuto "${product.code}" ya se encuentra registrado`;
            }

            if (!product.title || !product.description || !product.price || !product.status || !product.code || !product.stock || !product.category) {
                return "Error al cargar el producto. Faltan datos por cargar"
            }
            product.id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;

        } catch (error) {
            console.log(error);
        }

    }

    //method of return products of JSON by id
    getProductById = async (idProduct) => {

        try {
            const products = await this.getProducts();
            const indexProduct = products.findIndex(product => product.id === idProduct);

            if (indexProduct === -1) {
                return `El ID ${idProduct} no se encuentra registrado`;
            } else {
                return products[indexProduct];
            }
        } catch (error) {
            console.log(error);
        }


    }

    //method of update product in JSON
    updateProduct = async (idProduct, product) => {
        try {
            const products = await this.getProducts();
            const indexProduct = products.findIndex(p => p.id === id);

            if (indexProduct != -1) {
                if (products.some(p => p.code === product.code)) {
                    console.log(`El codigo de prodcuto "${product.code}" ya se encuentra registrado`)
                }
                else {
                    products[indexProduct] = {
                        title: product.title || products[indexProduct].title,
                        description: product.description || products[indexProduct].description,
                        price: product.price || products[indexProduct].price,
                        thumbnail: product.thumbnail || products[indexProduct].thumbnail,
                        code: product.code || products[indexProduct].code,
                        stock: product.stock || products[indexProduct].stock,
                        status: product.status || products[indexProduct].status,
                        category: product.category || products[indexProduct].category,
                        id: id
                    };

                    await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                }

            } else {
                return `El ID ${idProduct} no se encuentra registrado`;
            }

        } catch (error) {
            console.log(error);
        }
    }

    //method of delete product in array
    deleteProduct = async (idProduct) => {
        try {
            const products = await this.getProducts();
            const indexProduct = products.findIndex(product => product.id === idProduct);

            if (indexProduct === -1) {
                return `El ID ${idProduct} no se encuentra registrado`;
            } else {
                products.splice(indexProduct, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return `El producto con ID ${idProduct} se elimino`;
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductManager;