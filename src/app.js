const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router.js");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
///////////////// 
// Ruta de prueba:
app.get("/", (request, response) => {
    response.send("Hola, probando servidor");
})
/////////////////////////////////
// Rutas
app.use("/api", productsRouter);
app.use("/api", cartRouter);

/////////////////////////////
// Inicializo el servidor -- Ultima línea
app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})