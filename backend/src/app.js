import express from 'express';
import productsRoutes from './routes/products';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/', productsRoutes);


export default app;