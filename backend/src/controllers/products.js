import { connect } from '../database';
const { getProductsWithPrices, getProductById, addProduct, deleteProduct, updateProductData } = require('../services/productService');

export const getProducts = async (req, res) => {
    try {
        const productType = req.params.typeId;
        const products = await getProductsWithPrices(productType);
        return res.status(200).json({ products });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
} 

export const getProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const typeId = req.params.typeId;
      const product = await getProductById(id, typeId);
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

export const getProductCount = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT COUNT(*) FROM products");

    res.json(rows[0]["COUNT(*)"]);
}

export const createNewProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precioLista1, precioLista2, precioFiado, cantidadStock } = req.body;

        const newProduct = await addProduct(nombre, descripcion, precioLista1, precioLista2, precioFiado, cantidadStock);

        res.status(200).json(newProduct);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
  };

  export const deleteProductController = async (req, res) => {
    try {
      const productId = req.params.id;
      await deleteProduct(productId);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not delete product' });
    }
  };


  export const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const productData = req.body;
  
    try {
      const updatedProduct = await updateProductData({
        id: productId,
        ...productData, // Incluir todas las propiedades enviadas en el body de la petición
      });
  
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar el producto' });
    }
  };
