const pool = require('./db'); // Import your database connection pool

module.exports.closeDatabase = async () => {
    await pool.end();
    console.log('Database pool closed.');
};