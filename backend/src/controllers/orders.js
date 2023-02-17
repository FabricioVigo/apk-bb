import { connect } from '../database';

export const getOrders = async (req, res) => {
    const db = await connect();
    const [ rows ] = await db.query("SELECT * FROM orders")
    res.json(rows);
} 

export const getOrder = async (req, res) => {
    const db = await connect();
    const [ rows ] = await db.query("SELECT * FROM orders WHERE id = ?",[req.params.id]);
    res.json(rows[0]);
}

export const newOrders = async (req, res) => {
    try{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO orders (fecha, orders) VALUES (?,?)", [
        req.body.fecha,
        req.body.address
    ])
    res.json({
        id: results.insertId,
        ...req.body
    })
    
    }catch(error) {
        console.error(error)
}
}

export const deleteOrder = async (req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM orders WHERE id = ?", [req.params.id,
    ]);
    res.sendStatus(204);
};

export const orderUpdate = async (req, res) => {
    const connection = await connect();
    await connection.query("UPDATE orders SET ? WHERE id = ?", [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}