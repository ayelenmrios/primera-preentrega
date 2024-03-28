const fs = require("fs").promises;

class ProductManager {
    static lastId = 0;

    constructor(archivo) {
        this.products = [];
        this.path = archivo;
    }

    async addProduct(nuevoObjeto) {
        let {
            title,
            description,
            price,
            img,
            code,
            stock
        } = nuevoObjeto;

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios. Por favor revise los valores.");
            return;
        }
        if (this.products.some(item => item.code === code)) {
            console.log("Se repite el código de los productos. Por favor revise los valores.");
            return;
        }

        const newProduct = {
            id: ++ProductManager.lastId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct);
        await this.guardarArchivos(this.products);
    }
    /////////////////////////////////
    // MÉTODOS
    async getProducts(){
        const lectura = await this.leerProductos();
        return lectura;
    }
    async leerProductos() {
        try {
            const lectura = await fs.readFile(this.path, "utf-8");
            const respuesta = JSON.parse(lectura);
            return respuesta;

        } catch (error) {
            console.log("Se guardaron mal los productos, no se pueden leer", error);
        }
    }
    // Método getProductById
    async getProductById(id) {
        const lecturaPorId = await this.leerProductos();
        const product = lecturaPorId.find(item => item.id === id);

        if (!product) {
            console.log("Producto no encontrado");
            return null;
        } else {
            console.log("Producto encontrado!");
            console.log(product);
            return product;
        }
    }
    // Guardar archivo con productos
    async guardarArchivos() {
       await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
    }

    // Actualizar el producto
    async updateProduct(id, propiedad, nuevoValor) {
        const idBuscado = this.products.findIndex(item => item.id === id);
        if (idBuscado !== -1) {
            this.products[idBuscado][propiedad] = Number(nuevoValor);
            await this.guardarArchivos();
        } else {
            console.log("Ese id no existe");
        }
    }
    // Borrar producto del array
    async deleteProduct(id) {
        try {
            const productos = await this.leerProductos(); 
            const indice = productos.findIndex(item => item.id === id); 
    
            if (indice !== -1) {
                productos.splice(indice, 1); 
                // this.products = productos; 
                await this.guardarArchivos(productos);
                console.log("No se encontró el producto, pruebe con otro.");
                
            } else {
                console.log("El producto que quiere eliminar no existe");
            }
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //////////////////////////
}
//////////////////////////////////////
const ruta = new ProductManager("./archivoProductos.json");

// Exportación
module.exports = ProductManager;