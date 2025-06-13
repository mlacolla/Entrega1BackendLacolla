import fs from "fs";
class CartManager {


  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  //POST /:
  // Debe crear un nuevo carrito con la siguiente estructura:
  // id: Number/String (Autogenerado para asegurar que nunca se dupliquen los ids).

  // products: Array que contendrá objetos que representen cada producto.

  //Metodo para mostrar el carrito con su id-y array de products.
  async getCarts() {
    try {
      const file = await fs.promises.readFile(this.pathFile, "utf-8");
      return JSON.parse(file);
    } catch (error) {
      return []; // Si el archivo no existe o está vacío
    }
  }

  //Metodo para generar id unico e incremental.
  async generateNewId() {
    const carts = await this.getCarts();
    if (carts.length === 0) return 1;
    const maxId = Math.max(...carts.map(c => c.id));
    return maxId + 1;
  }

  //Metodo para crear el objeto cart con su id-y array de products vacio. 
  async createCart() {
    const carts = await this.getCarts();
    const newCart = {
      id: await this.generateNewId(),
      products: []
    };

    carts.push(newCart);
    await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
    return newCart;
  }

  // //Metodo para obtener el cart por su id.


  //Método para obtener un producto por ID
  async getCartById(cid) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);


      const cart = data.find((cart) => cart.id === parseInt(cid));
      //Verifica si no se encontró ningún producto (product es undefined o null) indica que no se encontro.

      if (!cart) throw new Error(`Producto con id: ${cid} no encontrado`);

      return cart;
    } catch (error) {
      throw new Error(`Error al traer el carrito - ${error.message}`);

    }
  }




  /// Debe agregar el producto al arreglo products del carrito seleccionado, busca por id el objeto y en el array del campo producto agrega un objeto. 
  //en postman > post > localhost:8080/api/carts/1/product/30
  //                           en cart 1 crea un array con product = 30 y el quantity empieza con 1 y se autoincrementa si se vuelve a agregar el mismo id producto. 
  /*
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
 
 */

  //Metodo para agregar el producto al arreglo products del carrito seleccionado. -post

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(c => c.id === parseInt(cartId));

    if (cartIndex === -1) {
      throw new Error(`Carrito con id ${cartId} no encontrado`);
    }

    const cart = carts[cartIndex];
    const productInCart = cart.products.find(p => p.product === parseInt(productId));

    if (productInCart) {
      // Si ya existe, aumentar cantidad
      productInCart.quantity += 1;
    } else {
      // Si no existe, agregar nuevo
      cart.products.push({ product: parseInt(productId), quantity: 1 });
    }

    // Guardar cambios
    await fs.promises.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
    return cart;
  }



  ///

  //Metodo para testing> Para no borrar el carts.json creo el metodo delete para ir borrando los objetos por su id. 


  async deleteCartById(idCart) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      const cartIndex = data.findIndex((car) => car.id === parseInt(idCart));

      if (cartIndex === -1) throw new Error(`Producto con id: ${idCart} no encontrado`);
      data.splice(cartIndex, 1);

      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');

      return data;
    } catch (error) {
      //si pongo un id que no esta en el json. 
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  }


}














export default CartManager;