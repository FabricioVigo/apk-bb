import express from 'express';
import {
  getOrderProductsController,
  addProductToOrderController,
  removeProductFromOrderController
} from '../controllers/orderController';

const router = express.Router();

// Obtener productos de un pedido
router.get('/orders/:orderId/products', getOrderProductsController);

// Agregar un producto a un pedido
router.post('/orders/:orderId/products', addProductToOrderController);

// Eliminar un producto de un pedido
router.delete('/orders/:orderId/products/:productId', removeProductFromOrderController);

export default router;