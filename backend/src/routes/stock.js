import { Router } from 'express';
import { getAllStocks, getStock, updateStock } from '../controllers/stock';

const router = Router();



router.get('/api/stock/:id', getStock);

router.get('/api/stock', getAllStocks);

router.put('/api/stock/:id', updateStock);


export default router;