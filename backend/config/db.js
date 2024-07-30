const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
  queueLimit: 0,
});


async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données réussie !');
    connection.release(); 
  } catch (error) {
    console.error('Échec de la connexion à la base de données :', error.message);
  }
}


testConnection();

module.exports = pool;