//  nodemon ./src/app.js

import express from "express";

//Rutas para Manejo de Productos (/api/products/)
import ProductManager from "./ProductManager.js";

//Rutas para Manejo de Carritos (/api/carts/)
import CartManager from "./CartManager.js";


//Rutas para Manejo de Productos (/api/products/)
const app = express();


//Habilita que nos puedan enviar jsons por ejemplo cuando hacemos un post request en postman en el body que nos trae info para nuestro archivo products.json
app.use(express.json()); //Para poder leer JSON en req.body -// Middlewares



const productManager = new ProductManager("./src/products.json");

const cartManager = new CartManager("./src/carts.json");

//rutas o endpoints

////Verificar en products.json los mismo, probar en browser y postman
//Ejecuta enpoint en postman como Get> localhost:8080/api/products


// Obtener todos los productos
app.get("/api/products", async (req, res, next) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ status: "success", products });
  } catch (error) {
    next(error);
  }
});

// Buscar producto por ID
//Ejecuta enpoint en postman como Get> localhost:8080/api/products/2

app.get("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.status(200).json({ status: "success", product });
  } catch (error) {
    next(error);
  }
});

// Agregar nuevo producto

//En postman hago un request post  atravez del body. Con Raw-Json. 
//localhost:8080/api/products
//   {

//     "title": "Taza Saw",
//     "description": "Taza con imagen de la Pelicula Saw",
//     "price": 950.9,
//     "status": true,
//     "stock":50, 
//     "category":"Peliculas", 
//     "thumbnails": []
//   }

//Agrega un nuevo producto. 
//Ejecuta enpoint en postman como post> localhost:8080/api/products


app.post("/api/products", async (req, res, next) => {
  try {
    const newProduct = req.body;
    const products = await productManager.addProduct(newProduct);
    res.status(201).json({ status: "success", products });
  } catch (error) {
    next(error);
  }
});

// Eliminar producto por ID
//Probar request en postman - Verificar en products.json que no este el producto.
//capturo el parametro dinamico del id
//Ejecuta enpoint en postman como delete > localhost:8080/api/products/4


app.delete("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const products = await productManager.deleteProductById(pid);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    next(error);
  }
});


//Edito-Actualizo un producto por id. 
//Puedo pasar todos las key del objeto o solo la que quiero modificar. 
//endpoint: localhost:8080/api/products/4
//En postman hago un request put  atravez del body. Con Raw-Json. 
// {
//      "price": 1500.9
// }

//Ejecuta enpoint en postman como put> localhost:8080/api/products/4


app.put("/api/products/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedData = req.body;
    const products = await productManager.updateProductById(pid, updatedData);
    res.status(200).json({ status: "success", products });
  } catch (error) {
    next(error);
  }
});


//control por terminal de que estamos escuchando el puerto 8080 en nustro localhost
app.listen(8080, () => {
  console.log("Servidor iniciado en el puerto 8080");
});

///////////////////////////////

//Rutas para Manejo de Carritos (/api/carts/)

//Agrega un nuevo producto a carrito/post. 

// POST /api/carts/ → Crear un nuevo carrito
// en postman > localhost:8080/api/carts
//Se crean los objetos en carts.json
//   {
//     "id": 1,
//     "products": []
//   },

//el id es autoincremental. 

//Ejecuta enpoint en postman como post > localhost:8080/api/carts

app.post("/api/carts", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json({ status: "success", cart: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
    next(error);
  }
});


// GET /api/carts/:cid  Obtener un carrito por ID

// //Ejecuta enpoint en postman como get>  localhost:8080/api/carts/1

app.get("/api/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.getCartById(cid);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    next(error);
  }
});



//Para mejor visualizacion y testing creo un get de todos los id con sus productos. 
//Ejecuta enpoint en postman como get>  localhost:8080/api/carts
app.get("/api/carts", async (req, res) => {
  try {
    const cart = await cartManager.getCarts(req.params.cid);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    //res.status(404).json({ status: "error", message: error.message });
    next(error);

  }
});


// POST /:cid/product/:pid:
// Debe agregar el producto al arreglo products del carrito seleccionado, utilizando el siguiente formato:
// product: Solo debe contener el ID del producto.
// quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).
// Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity de dicho producto.

//Ejecuta enpoint en postman como post > localhost:8080/api/carts/1/product/30
//en cart 1 creame el array con product 30, el quantity empieza con 1 y se autoincrementa si se vuelve a agregar el mismo id producto. 



app.post("/api/carts/:cid/product/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.status(201).json({ status: "success", cart: updatedCart });
  } catch (error) {
    next(error);
  }
});


//A modo de prueba creo la ruta delete cart con enpoint en postman > request Delete > localhost:8080/api/carts/1 -- en este caso creo el id 1 y luego lo elimino. 

//Ejecuta enpoint en postman como Delete > localhost:8080/api/carts/1


app.delete("/api/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const carts = await cartManager.deleteCartById(cid);
    res.status(200).json({ status: "success", carts });
  } catch (error) {
    next(error);
  }
});



// -------------------- MIDDLEWARES GLOBALES --------------------

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Ruta '${req.originalUrl}' no encontrada`,
  });
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack || err);
  res.status(500).json({
    status: "error",
    message: err.message || "Error interno del servidor",
  });
});

//
