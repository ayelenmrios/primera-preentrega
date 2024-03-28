const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

/////////////////
// Ruta de prueba:
app.get("/", (request, response) => {
    response.send("Hola, probando servidor");
})
/////////////////////////////////
// Rutas
app.use("/api", productsRouter);

/////////////////////////////
// Inicializo el servidor -- Ultima línea
app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el http://localhost:${PUERTO}`);
})