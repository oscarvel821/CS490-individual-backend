const mysql = require("mysql2");
// const dotenv = require('dotenv')

// dotenv.config();

// console.log(process.env.MYSQL_HOST)
// console.log(process.env.MYSQL_USER)
// console.log(process.env.MYSQL_PASSWORD)
// console.log(process.env.MYSQL_DATABASE)

// Create a connection to the database
// const pool = mysql.createPool(
//     {
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD,
//         database: process.env.MYSQL_DATABASE
//     }
// )

const pool = mysql.createPool(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Bigben70!?@@@',
        database: 'sakila',
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