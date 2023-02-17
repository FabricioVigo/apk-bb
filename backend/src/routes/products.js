import { Router } from 'express';
import { createNewProduct, deleteProductController, getProduct, getProductCount, getProducts, updateProduct } from '../controllers/products';

const router = Router();


router.get('/products/:typeId', getProducts);

router.get('/products/count', getProductCount);

router.get('/products/:id/:typeId', getProduct);

router.post('/products', createNewProduct);

router.delete('/products/:id', deleteProductController);

router.put('/products/:id', updateProduct);


export default router;