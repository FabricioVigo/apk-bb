import { Router } from 'express';
import { deleteOrder, getOrder, getOrders, newOrders, orderUpdate } from '../controllers/orders';


const router = Router();

router.get('/orders', getOrders);

router.get('/orders/:id', getOrder);

router.post('/orders', newOrders);

router.delete('/orders/:id', deleteOrder);

router.put('/orders/:id', orderUpdate);


export default router; 