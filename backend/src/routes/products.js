import { Router } from 'express';
import { createNewProduct, deleteProductController, getProduct, getProductCount, getProducts, updateProduct } from '../controllers/products';

const router = Router();


router.get('/api/products/:typeId', getProducts);

router.get('/api/products/count', getProductCount);

router.get('/api/products/:id/:typeId', getProduct);

router.post('/api/products', createNewProduct);

router.delete('/api/products/:id', deleteProductController);

router.put('/api/products/:id', updateProduct);


export default router;