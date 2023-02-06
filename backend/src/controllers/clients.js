import { connection } from '../database'

export const getClients = (req, res) => {
    connection.query("SELECT * FROM clients", function(err, results){
        console.log(results)
        res.json(results)
    })
}

export const getClient = (req, res) => {
    connection.query("SELECT * FROM clients WHERE id = ?",[req.params.id], function(err, results){
        console.log(results [0]);
        res.json(results [0]);
    })
}

export const saveClient = (req, res) => {
    connection.query("INSERT INTO clients (name, address) VALUES (?,?)", [req.body.name, req.body.address], (error, 
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


export const deleteClient = (req, res) => {
    connection.query("DELETE FROM clients WHERE id = ?", [req.params.id,], function (err, result){
        res.sendStatus(204);
    });
}


export const updateClient = (req, res) => {
    connection.query("UPDATE clients SET ? WHERE id = ?", [
        req.body,
        req.params.id,
    ])
    res.sendStatus(204);
}