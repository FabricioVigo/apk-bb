import { Router } from 'express';
import { saveProduct, deleteProduct, getProduct, getProductCount, getProducts, updateProduct } from '../controllers/products';

const router = Router();


router.get('/products', getProducts);

router.get('/products/count', getProductCount);

router.get('/products/:id', getProduct);

router.post('/products', saveProduct);

router.delete('/products/:id', deleteProduct);

router.put('/products/:id', updateProduct);



export default router;