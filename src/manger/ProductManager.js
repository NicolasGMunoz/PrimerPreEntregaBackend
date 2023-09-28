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
    addPorduct = async (title, description, code, price, status, stock, category, thumbnail) => {
        try {
            if (!title || !description || !code || !price || !status || !stock || !category) {
                return "Error al cargar el producto. Faltan datos por cargar";
            }

            const product = {
                title,
                description,
                code,
                price,
                status,
                stock,
                category,
                thumbnail

            }
            const products = await this.getProducts();

            //condition of existing code
            const indexCode = products.some(product => product.code === code)

            if (indexCode) {
                console.log(`El codigo de prodcuto "${product.code}" ya se encuentra registrado`)
            } else {
                //condition of id generator
                if (products.length === 0) {
                    product.id = 1;
                } else {
                    product.id = products[products.length - 1].id + 1;
                }
                products.push(product);

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));

                return product;
            }

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
    updateProduct = async (idProduct, title) => {
        try {
            const products = await this.getProducts();
            const indexProduct = products.findIndex(product => product.id === idProduct);

            if (indexProduct === -1) {
                return `El ID ${idProduct} no se encuentra registrado`;
            } else {
                Object.assign(products[indexProduct], { title: title });
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
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
                return console.log(`El ID ${idProduct} no se encuentra registrado`);
            } else {
                products.splice(indexProduct, 1)
                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
                return console.log(`El producto con ID ${idProduct} se elimino`);
            }
        } catch (error) {
            console.log(error);
        }
    }

}

export default ProductManager;