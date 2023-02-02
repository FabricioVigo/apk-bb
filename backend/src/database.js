const mysql = require('mysql2');

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'productsdb'
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the MySQL server.');
});
/* import mysql from 'mysql2/promise';
import { config } from './config';

export const connect = async () => {
   return await mysql.createConnection(config);
};
 
connect();  */