import express from 'express';
import productsRoutes from './routes/products';
import clientsRoutes from './routes/clients';
import stockRoutes from './routes/stock';
import ordersRoutes from './routes/orders';

import cors from 'cors';
import morgan from 'morgan';


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/', productsRoutes);
app.use('/', clientsRoutes);
app.use('/', stockRoutes);
app.use('/', ordersRoutes);



export default app;