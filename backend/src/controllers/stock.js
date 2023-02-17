import { connect } from "../database";

export const getStock = async (req, res, next) => {
    let productId = req.params.id;
  
    let sql = `
    SELECT 
    products1.stock_id as stock1,
    products2.stock_id as stock2,
    products_fiado.stock_id as stock_fiado,
    stock.quantity
  FROM products1
  LEFT JOIN products2 ON products1.stock_id = products2.stock_id
  LEFT JOIN products_fiado ON products1.stock_id = products_fiado.stock_id
  LEFT JOIN stock ON products1.stock_id = stock.id
  WHERE products1.id = ?;
  `
    try {
      const db = await connect();  
      const [result] = await db.query(sql, [productId]);
    
      let stocks = [];
result.forEach(row => {
    stocks.push({
        stock1: row.stock1,
        stock2: row.stock2,
        stock_fiado: row.stock_fiado,
        quantity: row.quantity
    });
});
res.json({stock: stocks});
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el stock' });
    }
  };
  

  export const getAllStocks = async (req, res) => {
    let sql = `
      SELECT 
        products1.id AS product1_id,
        products1.name AS product1_name,
        products1.stock_id AS product1_stock_id,
        products2.id AS product2_id,
        products2.name AS product2_name,
        products2.stock_id AS product2_stock_id,
        products_fiado.id AS product_fiado_id,
        products_fiado.name AS product_fiado_name,
        products_fiado.stock_id AS product_fiado_stock_id,
        stock.quantity
      FROM products1
      LEFT JOIN products2 ON products1.stock_id = products2.stock_id
      LEFT JOIN products_fiado ON products1.stock_id = products_fiado.stock_id
      LEFT JOIN stock ON products1.stock_id = stock.id;
    `;
  
    try {
      const db = await connect();
      const [result] = await db.query(sql);
  
      let stocks = [];
      result.forEach(row => {
        stocks.push({
          product1: {
            id: row.product1_id,
            name: row.product1_name,
            stock_id: row.product1_stock_id
          },
          product2: {
            id: row.product2_id,
            name: row.product2_name,
            stock_id: row.product2_stock_id
          },
          product_fiado: {
            id: row.product_fiado_id,
            name: row.product_fiado_name,
            stock_id: row.product_fiado_stock_id
          },
          quantity: row.quantity
        });
      });
  
      return res.json({ stocks: stocks });
    } catch (error) {
      return res.status(500).json({ error: 'Error al obtener el stock' });
    }

  };


  export const updateStock = async (req, res) => {
    const productId = req.params.id;
    const quantity = req.body.quantity;
  
    try {
      const db = await connect();
  
      const currentStock = await db.query('SELECT stock_id FROM products1 WHERE id = ?', [productId]);
      if (!currentStock || currentStock[0].stock_id < quantity) {
        return res.status(400).json({ error: 'No hay suficiente stock para realizar la operación' });
      }
  
      await db.beginTransaction();
  
      const updateProduct1 = await db.query('UPDATE products1 SET stock_id = stock_id - ? WHERE id = ? AND stock_id = ?', [quantity, productId, currentStock[0].stock_id]);
      const updateProduct2 = await db.query('UPDATE products2 SET stock_id = stock_id - ? WHERE id = ? AND stock_id = ?', [quantity, productId, currentStock[0].stock_id]);
      const updateProductFiado = await db.query('UPDATE products_fiado SET stock_id = stock_id - ? WHERE id = ? AND stock_id = ?', [quantity, productId, currentStock[0].stock_id]);
      const updateStock = await db.query('UPDATE stock SET quantity = quantity - ? WHERE id = ?', [quantity, currentStock[0].stock_id]);
  
      if (!updateProduct1 || !updateProduct2 || !updateProductFiado || !updateStock) {
        await db.rollback();
        return res.status(500).json({ error: 'Error al descontar el stock' });
      }
  
      await db.commit();
      return res.json({ message: 'Stock descontado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al descontar el stock' });
    }
  };
  

  
