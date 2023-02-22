import { connect } from '../database'

export const getProductsWithPrices = async (typeId) => {
    try {
      const db = await connect();
      const query = `
        SELECT products.*, product_prices.price, product_types.type_name
        FROM products
        JOIN product_prices ON products.id = product_prices.product_id
        JOIN product_types ON product_prices.product_type_id = product_types.id
        WHERE product_prices.product_type_id = ${typeId};
      `;
      const result = await db.query(query);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  export const getProductById = async (id, typeId) => {
    try {
      const db = await connect();
      const query = `
        SELECT products.*, product_prices.price, product_types.type_name
        FROM products
        JOIN product_prices ON products.id = product_prices.product_id
        JOIN product_types ON product_prices.product_type_id = product_types.id
        WHERE products.id = ${id} AND product_prices.product_type_id = ${typeId};
      `;
      const result = await db.query(query);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


  export const addProduct = async(nombre, descripcion, precioLista1, precioLista2, precioFiado, cantidadStock) => {
    try {
      // Insertar el nuevo producto en la tabla "products"
      const db = await connect();
      const result = await db.query('INSERT INTO products (name, description) VALUES (?, ?)', [nombre, descripcion]);
      const productId = result.insertId;
  
      // Insertar los precios del nuevo producto en la tabla "product_prices"
      await db.query('INSERT INTO product_prices (product_id, price, product_type_id) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
                     [productId, precioLista1, 1, productId, precioLista2, 2, productId, precioFiado, 3]);
  
      // Insertar la cantidad inicial del nuevo producto en la tabla "stock"
      await db.query('INSERT INTO stock (product_id, quantity) VALUES (?, ?)', [productId, cantidadStock]);
  
      return { id: productId, name: nombre, description: descripcion, precioLista1, precioLista2, precioFiado, cantidadStock };
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  };
  
  
  export const deleteProduct = async (productId) => {
    try {
      const db = await connect();
  
      // Eliminar registros de precios asociados al producto
      const deletePricesQuery = `
        DELETE FROM product_prices WHERE product_id = ?
      `;
      await db.query(deletePricesQuery, [productId]);
  
      // Eliminar registros de stock asociados al producto
      const deleteStockQuery = `
        DELETE FROM stock WHERE product_id = ?
      `;
      await db.query(deleteStockQuery, [productId]);
  
      // Eliminar el registro del producto
      const deleteProductQuery = `
        DELETE FROM products WHERE id = ?
      `;
      await db.query(deleteProductQuery, [productId]);
  
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  
  export const updateProductData = async (productData) => {
    let db;
    let transaction;
    try {
      db = await connect();
      transaction = await db.beginTransaction();
  
      // Validar los datos de entrada
      if (!productData.id || !productData.name || !productData.description || !productData.price || !productData.stock) {
        throw new Error('Los datos de entrada son incorrectos');
      }
  
      // Actualizar el nombre y la descripción del producto
      const updateProductQuery = 'UPDATE products SET name = ?, description = ? WHERE id = ?';
      const updateProductResult = await db.query(updateProductQuery, [productData.name, productData.description, productData.id]);
      if (updateProductResult.affectedRows !== 1) {
        throw new Error('No se pudo actualizar el producto');
      }
  
      // Actualizar el precio del producto
      const updatePriceQuery = 'UPDATE product_prices SET price = ? WHERE product_id = ?';
      const updatePriceResult = await db.query(updatePriceQuery, [productData.price, productData.id]);
      if (updatePriceResult.affectedRows !== 1) {
        throw new Error('No se pudo actualizar el precio del producto');
      }
  
      // Actualizar la cantidad de stock del producto
      const updateStockQuery = 'UPDATE stock SET quantity = ? WHERE product_id = ?';
      const updateStockResult = await db.query(updateStockQuery, [productData.stock, productData.id]);
      if (updateStockResult.affectedRows !== 1) {
        throw new Error('No se pudo actualizar la cantidad de stock del producto');
      }
  
      // Obtener los datos actualizados del producto
      const getProductQuery = 'SELECT * FROM products WHERE id = ?';
      const getProductResult = await db.query(getProductQuery, [productData.id]);
      if (getProductResult.length !== 1) {
        throw new Error('No se pudo obtener el producto actualizado');
      }
  
      // Confirmar la transacción
      await transaction.commit();
  
      return getProductResult[0];
    } catch (error) {
      console.error(error);
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    } finally {
      if (db) {
        await db.end();
      }
    }
  };



  export const getProductAndStock = async (productId) => {
    const query = `SELECT products.id, products.name, products.description, stock.quantity 
                   FROM products 
                   INNER JOIN stock ON products.id = stock.product_id
                   WHERE products.id = ?`;
  
    try {
      const db = await connect();
      const [rows] = await db.query(query, [productId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  };



  export const getProductsAndStock = async () => {
    const query = `SELECT products.id, products.name, products.description, stock.quantity 
                   FROM products 
                   INNER JOIN stock ON products.id = stock.product_id`;
  
    try {
      const db = await connect();
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }
  


  // Servicio para actualizar el stock de un producto
export const updateProductStock = async (productId, quantity, isAddition) => {
  const sign = isAddition ? '+' : '-';
  const query = `UPDATE stock SET quantity = quantity ${sign} ? WHERE product_id = ?`;

  try {
    const db = await connect();
    await db.query(query, [quantity, productId]);
  } catch (error) {
    throw error;
  }
};

