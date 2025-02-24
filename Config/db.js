const mysql = require("mysql2/promise"); // Use promise-based MySQL2

// Create a connection pool instead of a single connection
const dbPool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "perpustakaan",
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0
});

module.exports = dbPool; // Export the pool for use in other files