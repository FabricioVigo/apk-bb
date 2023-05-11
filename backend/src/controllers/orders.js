import {
    getOrderProducts,
    addProductToOrder,
    removeProductFromOrder
  } from '../services/orderProductsService';
  
  // Obtener productos de un pedido
  export const getOrderProductsController = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const products = await getOrderProducts(orderId);
      res.json(products);
    } catch (error) {
      next(error);
    }
  };
  
  // Agregar un producto a un pedido
  export const addProductToOrderController = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { productId, quantity } = req.body;
      await addProductToOrder(orderId, productId, quantity);
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  };
  
  // Eliminar un producto de un pedido
  export const removeProductFromOrderController = async (req, res, next) => {
    try {
      const { orderId, productId } = req.params;
      await removeProductFromOrder(orderId, productId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };