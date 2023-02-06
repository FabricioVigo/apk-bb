import express from 'express';
import productsRoutes from './routes/products';
import productsRoutes2 from './routes/products2';
import clientRoute from './routes/clients';
import orderRoute from './routes/orders';

const app = express();

app.use(express.json());
app.use('/', productsRoutes);
app.use('/', productsRoutes2);
app.use('/', clientRoute);
app.use('/', orderRoute);





export default app;