import { Router } from 'express';
import { getAllStocks, getStock, updateStock } from '../controllers/stock';

const router = Router();



router.get('/stock/:id', getStock);

router.get('/stock', getAllStocks);

router.patch('/stock/:id', updateStock);


export default router;