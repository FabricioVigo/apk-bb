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
    try {
      const db = await connect();
  
      // Update the product name and description
      const updateProductQuery = `
        UPDATE products
        SET name = ?, description = ?
        WHERE id = ?
      `;
      await db.query(updateProductQuery, [productData.name, productData.description, productData.id]);
  
      // Update the product price
      const updatePriceQuery = `
        UPDATE product_prices
        SET price = ?
        WHERE product_id = ?
      `;
      await db.query(updatePriceQuery, [productData.price, productData.id]);
  
      // Update the product stock
      const updateStockQuery = `
        UPDATE stock
        SET quantity = ?
        WHERE product_id = ?
      `;
      await db.query(updateStockQuery, [productData.stock, productData.id]);
  
  
      // Get the updated product data
      const getProductQuery = `
        SELECT *
        FROM products
        WHERE id = ?
      `;
      const result = await db.query(getProductQuery, [productData.id]);
  
      return result[0];
    } catch (error) {
      console.error(error);
      if (transaction) {
        await transaction.rollback();
      }
      throw error;
    }
  };
  