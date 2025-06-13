Testing> 

Pre requisitos> 
- Correr por terminal> npm init -y  para crear carpeta node_modules o npm install y veriricar que en el archivo package.json, debajo del main, diga "type": "module". 
- Controlar instalacion de moment, de lo contrario correr en terminal>  npm install moment
- Controlar instalacion de express para levantar el servidor, de lo contrario>  npm install express
- Se recomienda nodemon para que el servicio se corra automaticamente, no tenerlo correr en terminal> npm install -g nodemon, de lo contrario correr el archivo app como node.
- Controlar instalacion de postman para importar los request que estan en el archivo postmanRequest.jsonm el programa soliciara crear o seleccionar una coleccion creada para poder realizar la importacion. 

* Correr en terminal> 
nodemon ./src/app.js 
ó en su defecto 
node ./src/app.js

Aclaracion: Para ver mejor el manejo de errores ya se porque se coloco incorrectamente la url del requests en postman, esta mal el sript en el ide ,el json no tiene el formato correcto o se esta buscando o queriendo ediar o eliminar un cart o products por id que no existte utilice MIDDLEWARES. (Queda pendiente ver cual es la manera mas eficiente y clara de manejar los errores). 

De no contar con la ruta de url correcta se visualiza por ejemplo: 
{
    "status": "error",
    "message": "Ruta '/api/product' no encontrada"
}


El codigo se encuentra en el reposotorio publico de> https://github.com/mlacolla/Entrega1BackendLacolla.git 
---------

-TESTING Ruta para Manejo de Productos (/api/products/)

1) Verificar que objetos hay creadas en el archivo products.json -Por default se dejan creados dos objetos> 
Request get > localhost:8080/api/products
Se obtiene dos objetos> 
{
    "status": "success",
    "products": [
        {
            "id": 1,
            "title": "Taza Bastardos sin gloria",
            "description": "Taza con imagen de la Pelicula Bastardos sin gloria",
            "code": "1",
            "price": 800.9,
            "status": true,
            "stock": 60,
            "category": "Peliculas",
            "thumbnails": []
        },
        {
            "id": 2,
            "title": "Taza Barbie",
            "description": "Taza con imagen de la Pelicula Barbie",
            "code": "2",
            "price": 900.9,
            "status": true,
            "stock": 60,
            "category": "Peliculas",
            "thumbnails": []
        }
    ]
}

Si utilizamos en enpoint con el metodo para encontrar productos por id: 

localhost:8080/api/products/3
Obtenemos como respuesta: 
{
    "status": "success",
    "product": {
        "id": 3,
        "code": 3,
        "title": "Taza Saw",
        "description": "Taza con imagen de la Pelicula Saw",
        "price": 950.9,
        "status": true,
        "stock": 50,
        "category": "Peliculas",
        "thumbnails": []
    }
}

de colocar un ID inexistente en el json se visualiza el error: 
{
    "status": "error",
    "message": "Error al traer los productos - Producto con id: 50 no encontrado"
}


2) Modificamos el precio del objeto 2 
Request put> localhost:8080/api/products/2
 Con body-raw-json detallamos que campo vamos a modificar> 
 {
     "price": 1500.9

}

Si colocamos un id inexistente por ejemplo: localhost:8080/api/products/50
Obtenemos como respuesta: 
{
    "status": "error",
    "message": "Error al actualizar el producto: Producto con id: 50 no encontrado"
}


3) Crear un nuevo objeto nuevo. 

Request post > localhost:8080/api/products/
 Con body-raw-json detallamos los campo que vamos a agregar> 
  {

    "title": "Taza Saw",
    "description": "Taza con imagen de la Pelicula Saw",
    "price": 950.9,
    "status": true,
    "stock":50, 
    "category":"Peliculas", 
    "thumbnails": []
  }


Si desde el body no se agregan todos los campos los mismos no se muestran en el objeto creado. 
El id es 3, el mismo con cada objeto creado es unico e incremental. 

4) Eliminar un objeto creado, en este caso eliminamos el id 3 que es el objeto creado con el post objeto creado. 
Request delete > localhost:8080/api/products/3
Se obtiene los objetos que estan por defecto en el archivo products.json 
{
    "status": "success",
    "products": [
        {
            "id": 1,
            "title": "Taza Bastardos sin gloria",
            "description": "Taza con imagen de la Pelicula Bastardos sin gloria",
            "code": "1",
            "price": 800.9,
            "status": true,
            "stock": 60,
            "category": "Peliculas",
            "thumbnails": []
        },
        {
            "id": 2,
            "title": "Taza Barbie",
            "description": "Taza con imagen de la Pelicula Barbie",
            "code": "2",
            "price": 900.9,
            "status": true,
            "stock": 60,
            "category": "Peliculas",
            "thumbnails": []
        }
    ]
}


Si se solicita eliminar un id inexistente: 
{
    "status": "error",
    "message": "Error al eliminar el producto: Producto con id: 5 no encontrado"
}


-Verificar que en el json de IDE (el usado en este caso fue Visual Code) tambien se agreguen y eliminen los productos correctamente. 

-------------------------------------------------


- TESTING Rutas para Manejo de Carritos (/api/carts/)

1) Verificar que objetos hay creadas en el archivo cart.json -Por default lo dejo vacio> 
Request get > localhost:8080/api/carts
 Se obtiene un array vacio. 
 {
    "status": "success",
    "cart": []
}

De colocar mal la ruta del enpoint se visualiza el error: 
{
    "status": "error",
    "message": "Ruta '/api/cart' no encontrada"
}

2) Crear un objeto con su id y el array de product vacio. 
Request post  localhost:8080/api/carts 
Se obtiene>  un objeto con las key id y products , siendo el primero un Number y el segundo un array. Con cada solicitud de request de post se genera un nuevo id unico e autoincremental. 
{
    "status": "success",
    "cart": {
        "id": 1,
        "products": []
    }
}



3) Request post by id para agregrar al array products el numero del producto y la cantidad que es autoincremental. 
Request post localhost:8080/api/carts/1/product/30
Se debe aclarar de que carrito y que producto agregar, por ejemplo del carrito 1 agregar el producto 30. 
Si hacemos dos request iguales el resultado es> 
Con el primer request> 
{
    "status": "success",
    "cart": {
        "id": 1,
        "products": [
            {
                "product": 30,
                "quantity": 1
            }
        ]
    }
}

Con el segundo request igual> 
{
    "status": "success",
    "cart": {
        "id": 1,
        "products": [
            {
                "product": 30,
                "quantity": 2
            }
        ]
    }
}

La cantidad (quantity) comienza con 1 y es autoincremental. 

Si se solicita colocar uun producto en un carrito inexistente se visualiza el error:
Caso enpoint: localhost:8080/api/carts/10/product/30
{
    "status": "error",
    "message": "Carrito con id 10 no encontrado"
} 

4) 
Eliminar un objeto creado, en este caso eliminamos el id 1 que es el objeto creado con el post objeto creado. 
Request delete > localhost:8080/api/products/3
Se obtiene los objetos que estan por defecto en el archivo products.json 

Si se trata de eliminar un carrito con un id inexistente: 
Caso: enpoint - localhost:8080/api/carts/10
{
    "status": "error",
    "message": "Error al eliminar el carrito: Producto con id: 10 no encontrado"
}

Si eliminamos el id 1 que fue el unico que se creo : 

{
    "status": "success",
    "carts": []
}

Si creamos mas carts y solo eliminamos el id 1, se visualiza el resto. 


-Verificar que en el json de IDE (el usado en este caso fue Visual Code) tambien se agreguen y eliminen los cart y los arrays de los productos. 
