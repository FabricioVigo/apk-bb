import { Router } from 'express';
import { deleteClient, getClient, getClients, saveClient, updateClient } from '../controllers/clients';


const router = Router();

router.get('/api/clients', getClients);

router.get('/api/clients/:id', getClient);

router.post('/api/clients', saveClient);

router.delete('/api/clients/:id', deleteClient);

router.put('/api/clients/:id', updateClient);


export default router; 