import { Router } from 'express';
import { deleteClient, getClient, getClients, saveClient, updateClient } from '../controllers/clients';


const router = Router();

router.get('/clients', getClients);

router.get('/clients/:id', getClient);

router.post('/clients', saveClient);

router.delete('/clients/:id', deleteClient);

router.put('/clients/:id', updateClient);


export default router; 