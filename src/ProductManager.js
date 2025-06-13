import fs from "fs";

class ProductManager {

  constructor(pathFile) {
    this.pathFile = pathFile;
  }

  async getProducts() {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);
      return products;
    } catch (error) {
      //Entra aca por ejemplo si los objetos en el json no estan separados por comas. 
      throw new Error(`Error al traer los productos - ${error.message}`);
    }
  }

  //

  // Método para obtener un producto por ID
  async getProductById(idProduct) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);


      const product = data.find((prod) => prod.id === parseInt(idProduct));
      //Verifica si no se encontró ningún producto (product es undefined o null) indica que no se encontro.

      if (!product) throw new Error(`Producto con id: ${idProduct} no encontrado`);

      return product;
    } catch (error) {
      //throw new Error(`Error al obtener el producto: ${error.message}`);
      throw new Error(`Error al traer los productos - ${error.message}`);

    }
  }

  generateNewId(products) {
    if (products.length > 0) {
      return products[products.length - 1].id + 1;
    } else {
      return 1;
    }
  }

  ///

  generateNewCode(products) {
    if (products.length === 0) return 1;

    const lastCode = Math.max(...products.map(prod => prod.code));
    return lastCode + 1;
  }
  ///

  async addProduct(newProduct) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const newId = this.generateNewId(products);
      const newCode = this.generateNewCode(products);

      const product = { id: newId, code: newCode, ...newProduct };
      products.push(product);

      await fs.promises.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      //Si cuando quiero agregar pongo mal una variable     const product = { id: newId, code: newCode, ...newProdu };
      throw new Error(`Error al añadir el producto - ${error.message}`);
    }
  }

  async deleteProductById(idProduct) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      const productIndex = data.findIndex((prod) => prod.id === parseInt(idProduct));

      if (productIndex === -1) throw new Error(`Producto con id: ${idProduct} no encontrado`);
      data.splice(productIndex, 1);

      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');

      return data;
    } catch (error) {
      //si pongo un id que no esta en el json. 
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  }

  //put
  async updateProductById(idProduct, updatedProduct) {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      const productIndex = data.findIndex((prod) => prod.id === parseInt(idProduct));
      if (productIndex === -1) throw new Error(`Producto con id: ${idProduct} no encontrado`);

      data[productIndex] = { ...data[productIndex], ...updatedProduct };
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2), 'utf-8');

      return data;
    } catch (error) {
      //si busco un id que no esa en el json. 
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  }


}

export default ProductManager;