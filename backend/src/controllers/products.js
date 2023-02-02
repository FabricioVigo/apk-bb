import { connection } from '../database';

export const getProducts = async (req, res) => {
    connection.query('SELECT * FROM products', function (error, results, fields) {
        if (error) throw error;
        console.log(results);
        res.json(results);
      });
} 

export const getProduct = async (req, res) => {
    connection.query("SELECT * FROM products WHERE id = ?", [req.params.id], function (error, result, fields){

        console.log(result [0])
        res.json(result [0])
    });
}

export const getProductCount = (req, res) => {
    connection.query("SELECT COUNT(*) FROM products", function (error, result, fields){
        console.log(result)
        res.json(result[0]["COUNT(*)"])
    })
}

export const saveProduct = (req, res) => {
   const [results] = connection.query("INSERT INTO products(title, description, price) VALUES(?,?,?)",
    [
        req.body.title,
        req.body.description,
        req.body.price,
    
   ]);
        res.json({
        id: results.insertId,
        ...req.body
    })
}

export const deleteProduct = (req, res) => {
    connection.query("DELETE FROM products WHERE id = ?", [req.params.id,], function (err, result){

        console.log(result)
        res.json({
        })
    });
}

export const updateProduct = (req, res) => {
    res.send('Hello world')
}
