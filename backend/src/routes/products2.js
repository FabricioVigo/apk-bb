import { Router } from 'express';
import { saveProduct, deleteProduct, getProduct, getProductCount, getProducts, updateProduct } from '../controllers/products2';

const router = Router();


router.get('/products2', getProducts);

router.get('/products2/count', getProductCount);

router.get('/products2/:id', getProduct);

router.post('/products2', saveProduct);

router.delete('/products2/:id', deleteProduct);

router.put('/products/:id', updateProduct);



export default router;