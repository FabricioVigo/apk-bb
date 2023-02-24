import { connect } from '../database';

export const getClients = async (req, res) => {
    const db = await connect();
    const [ rows ] = await db.query("SELECT * FROM clients")
    res.json(rows);
} 

export const getClient = async (req, res) => {
    const db = await connect();
    const [ rows ] = await db.query("SELECT * FROM clients WHERE id = ?",[req.params.id]);
    res.json(rows[0]);
}

export const saveClient = async (req, res) => {
    try{
    const connection = await connect();
    const [results] = await connection.query("INSERT INTO clients (name, address) VALUES (?,?)", [
        req.body.name,
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

export const deleteClient = async (req, res) => {
    const connection = await connect();
    await connection.query("DELETE FROM clients WHERE id = ?", [req.params.id,
    ]);
    res.sendStatus(204);
};

export const updateClient = async (req, res) => {
    const connection = await connect();
    await connection.query("UPDATE clients SET ? WHERE id = ?", [
        req.body,
        req.params.id
    ]);
    res.sendStatus(204);
}