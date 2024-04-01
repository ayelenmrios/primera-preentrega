const express = require("express");
const router = express.Router();
const cartManager = require("../controllers/cartManager.js");
const carritoManager = new cartManager("./src/models/carts.json");
///////////////////////////////////

// Ruta


// creo un nuevo Ruta raíz
router.post("/carts", async (request, response) => {
    const nuevoCarrito = await carritoManager.crearCarrito();
    response.json(nuevoCarrito);
})

// Ruta GET /:cid
router.get("/carts/:cid", async (request, response) => {
    const cartId = parseInt(request.params.cid);

    const carrito = await carritoManager.getCarritoById(cartId);
    response.json(carrito.productos);
})

// Ruta POST /:cid/product/:pid
router.post("/carts/:cid/product/:pid", async (request, response) => {
    const quantity = request.body.quantity || 1;
    const prodId = request.params.pid;
    const cartId = parseInt(request.params.cid);

    const cartActualizado = await carritoManager.agregarProdCarrito(cartId, prodId, quantity);
    response.json(cartActualizado.productos);
})

///////////////////////////
module.exports = router;

