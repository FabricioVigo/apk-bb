import { connect } from "../database";
import { getProductAndStock, getProductsAndStock, updateProductStock } from "../services/stockService";

export const getStock = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await getProductAndStock(productId);

    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching product from database');
  }
  };
  

  export const getAllStocks = async (req, res) => {
    try {
      const products = await getProductsAndStock();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products from database');
    }
  };


  export const updateStock = async (req, res, next) => {
    const { productId, quantity, isAddition } = req.body;
  
    try {
      // Validar que se reciban todos los datos necesarios
      if (!productId || !quantity || isAddition === undefined) {
        throw new Error('Faltan datos requeridos');
      }
  
      // Actualizar el stock del producto
      await updateProductStock(productId, quantity, isAddition);
  
      res.status(200).json({ message: 'Stock actualizado exitosamente' });
    } catch (error) {
      next(error);
    }
  };
  
  

  
