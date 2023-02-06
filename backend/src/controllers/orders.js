import { connection } from '../database'

export const getOrders = (req, res) => {
    connection.query("SELECT * FROM orders", function(err, results){
        console.log(results)
        res.json(results)
    })
}

export const getOrder = (req, res) => {
    connection.query("SELECT * FROM orders WHERE id = ?",[req.params.id], function(err, results){
        console.log(results [0]);
        res.json(results [0]);
    })
}

export const newOrders = (req, res) => {
    connection.query("INSERT INTO orders (fecha, orders) VALUES (?,?)", [req.body.fecha, req.body.orders], (error, 
        results) => {
           if(results){
    
               res.json({
                   id: results.insertId,
                   ...req.body})
           }else{
            res.json({ error: error })
           }
           }); 
}


export const deleteOrder = (req, res) => {
    connection.query("DELETE FROM orders WHERE id = ?", [req.params.id,], function (err, result){
        res.sendStatus(204);
    });
}


export const orderUpdate = (req, res) => {
    connection.query("UPDATE clients SET ? WHERE id = ?", [
        req.body,
        req.params.id,
    ])
    res.sendStatus(204);
}