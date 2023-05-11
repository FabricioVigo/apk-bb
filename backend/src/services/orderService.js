import { connect } from '../database';

export const getOrderProducts = async (orderId) => {
  try {
    const db = await connect();
    const query = `SELECT products.id, products.name, products.description, order_products.quantity 
                   FROM order_products
                   INNER JOIN products ON order_products.product_id = products.id
                   WHERE order_products.order_id = ?`;
    const [rows] = await db.query(query, [orderId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const addProductToOrder = async (orderId, productId, quantity) => {
  try {
    const db = await connect();
    const query = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)`;
    await db.query(query, [orderId, productId, quantity]);
  } catch (error) {
    throw error;
  }
};

export const removeProductFromOrder = async (orderId, productId) => {
  try {
    const db = await connect();
    const query = `DELETE FROM order_products WHERE order_id = ? AND product_id = ?`;
    await db.query(query, [orderId, productId]);
  } catch (error) {
    throw error;
  }
};



// import { connect } from '../database'

// export const getOrderProducts = async (orderId) => {
//   const query = `SELECT products.id, products.name, products.description, order_products.quantity 
//                  FROM order_products
//                  INNER JOIN products ON order_products.product_id = products.id
//                  WHERE order_products.order_id = ?`;

//   try {
//     const db = await connect();
//     const [rows] = await db.query(query, [orderId]);
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

// export const addProductToOrder = async (orderId, productId, quantity) => {
//   const query = `INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)`;

//   try {
//     const db = await connect();
//     await db.query(query, [orderId, productId, quantity]);
//   } catch (error) {
//     throw error;
//   }
// };

// export const removeProductFromOrder = async (orderId, productId) => {
//   const query = `DELETE FROM order_products WHERE order_id = ? AND product_id = ?`;

//   try {
//     const db = await connect();
//     await db.query(query, [orderId, productId]);
//   } catch (error) {
//     throw error;
//   }
// };
