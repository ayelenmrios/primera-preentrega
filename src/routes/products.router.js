const express = require("express");
const router = express.Router();
const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/models/archivoProductos.json");
///////////////////////////////

// MANEJO DE PRODUCTOS

// Ruta raíz GET
router.get("/products", async (request, response) => {
    const limit = request.query.limit;

    const productos = await manager.getProducts();
    if (limit) {
        response.json(productos.slice(0, limit));
    } else {
        response.json(productos);
    }
   
})

// Ruta GET /:pid
router.get("/products/:pid", async (request, response) => {
    const id = request.params.pid;

    const producto = await manager.getProductById(parseInt(id));
    if (!producto) {
        return response.json({
            error: "Producto no encontrado"
        });
    }
    response.json(producto);
})

// Ruta PUT /:pid
router.put("/products/:pid", async (request, response) => {
    const id = request.params.pid;
    const productoActualizado = request.body;

    try{
        // 
        await manager.updateProduct(parseInt(id), productoActualizado);
        response.json({message: "Producto actualizado correctamente!"});
    } catch(error){
        // 
        response.status(500).json({error: "Error interno del servidor"});
    }
})

// Ruta DELETE /:pid
router.delete("/products/:pid", async (request, response) => {
    const id = request.params.pid;

    try{
        await manager.deleteProduct(parseInt(id));
        response.json({message: "Producto eliminado muy bien!"});
    } catch (error){
        response.status(500).json({error: "Erro interno del servidor"});
    }
})

// Ruta POST 
router.post("/products", async (request, response) => {
    const nuevoProducto = request.body;
    try {
        await manager.addProduct(nuevoProducto);
        response.status(200).json({message: "Se agregó un nuevo producto!"});
    } catch (error){
        response.status(500).json({error: "Error interno del servidor"});
    }
})

///////////////////////////////////
module.exports = router;