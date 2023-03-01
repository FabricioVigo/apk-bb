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
      return result[0];
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
      return result[0];
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
      console.log(result)
      const product_id = result[0].insertId
      console.log(product_id);
  
      // Insertar los precios del nuevo producto en la tabla "product_prices"
      await db.query('INSERT INTO product_prices (product_id, price, product_type_id) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)',
                     [product_id, precioLista1, 1, product_id, precioLista2, 2, product_id, precioFiado, 3]);
  
      // Insertar la cantidad inicial del nuevo producto en la tabla "stock"
      await db.query('INSERT INTO stock (product_id, quantity) VALUES (?, ?)', [product_id, cantidadStock]);
  
      return { id: product_id, name: nombre, description: descripcion, precioLista1, precioLista2, precioFiado, cantidadStock };
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
    const db = await connect();
  
    try {
      const result = await db.transaction(async () => {
        // Validar los datos de entrada
        if (!productData.id) {
          throw new Error('Falta el ID del producto');
        }
  
        // Actualizar el producto y obtener los datos actualizados
        const updateProductQuery = 'UPDATE products SET ';
        const updatePriceQuery = 'UPDATE product_prices SET ';
        const updateStockQuery = 'UPDATE stock SET ';
        const queryParameters = [];
  
        // Agregar cláusulas a las consultas de actualización según las propiedades que se hayan incluido en productData
        if (productData.name) {
          updateProductQuery += 'name = ?, ';
          queryParameters.push(productData.name);
        }
        if (productData.description) {
          updateProductQuery += 'description = ?, ';
          queryParameters.push(productData.description);
        }
        if (productData.price) {
          updatePriceQuery += 'price = ?, ';
          queryParameters.push(productData.price);
        }
        if (productData.stock) {
          updateStockQuery += 'quantity = ?, ';
          queryParameters.push(productData.stock);
        }
  
        // Si no se ha incluido ninguna propiedad para actualizar, lanzar un error
        if (queryParameters.length === 0) {
          throw new Error('No se han proporcionado datos para actualizar el producto');
        }
  
        // Eliminar la coma final de las consultas de actualización
        updateProductQuery = updateProductQuery.slice(0, -2) + ' ';
        updatePriceQuery = updatePriceQuery.slice(0, -2) + ' ';
        updateStockQuery = updateStockQuery.slice(0, -2) + ' ';
  
        // Agregar la cláusula WHERE a las consultas de actualización
        updateProductQuery += 'WHERE id = ?';
        updatePriceQuery += 'WHERE product_id = ?';
        updateStockQuery += 'WHERE product_id = ?';
        queryParameters.push(productData.id);
  
        const [updateProductResult, updatePriceResult, updateStockResult, getProductResult] = await Promise.all([
          db.query(updateProductQuery, queryParameters),
          db.query(updatePriceQuery, [productData.price, productData.id]),
          db.query(updateStockQuery, [productData.stock, productData.id]),
          db.query(getProductQuery, [productData.id]),
        ]);
  
        if (updateProductResult.affectedRows !== 1 || updatePriceResult.affectedRows !== 1 || updateStockResult.affectedRows !== 1 || getProductResult.length !== 1) {
          throw new Error('No se pudo actualizar el producto');
        }
  
        return getProductResult[0];
      });
  
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Error al actualizar el producto');
    } finally {
      await db.end();
    }
  };