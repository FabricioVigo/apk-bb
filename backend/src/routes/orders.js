import { Router } from 'express';
import { deleteOrder, getOrder, getOrders, newOrders, orderUpdate } from '../controllers/orders';


const router = Router();

router.get('/api/orders', getOrders);

router.get('/api/orders/:id', getOrder);

router.post('/api/orders', newOrders);

router.delete('/api/orders/:id', deleteOrder);

router.put('/api/orders/:id', orderUpdate);


export default router; 