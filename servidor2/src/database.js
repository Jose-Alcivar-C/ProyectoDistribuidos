const mysql = require("mysql");

const { promisify } = require("util");

const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if(err){
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("conexión con base de datos fue cerrada");
        }

        if(err.code === "ER_CON_COUNT_ERROR"){
            console.error("base de datos tiene muchas conexiones");
        }

        if(err.code === "ECONNREFUSED"){
            console.error("La conexión con base de datos fue rechazada");
        }
    }

    if(connection) connection.release();
    console.log("base de datos conectada");
    return; 
});

//promisify pool querys
pool.query = promisify(pool.query);

module.exports = pool;