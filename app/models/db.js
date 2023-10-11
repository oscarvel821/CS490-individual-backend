const mysql = require("mysql2");
const dbConfig = require("../config/db.config")

const pool = mysql.createPool(
    {
        host: dbConfig.HOST,
        user: dbConfig.USER,
        password: dbConfig.PASSWORD,
        database: dbConfig.DB,
        waitForConnections: true, // Optional: Set to true if you want the pool to wait for available connections.
        connectionLimit: 100, // Optional: Set the maximum number of connections in the pool.
        queueLimit: 0, // Optional: Set the maximum number of queued connection requests (0 means no limit).
    }
)

//open the MySQL connection
// connection.connect(error => {
//   if (error) throw error;
//   console.log("Successfully connected to the database.");
// });

// pool.promise().getConnection().then((connection) => {
//     console.log("Successfully connected to the database");

// })

module.exports = pool.promise();