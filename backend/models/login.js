const pool = require('../config/db');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS login (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      num_telephone VARCHAR(20),
      adresse TEXT,
      code_postal VARCHAR(10),
      date_naissance DATE,
      role TINYINT(1) DEFAULT 0
    );
  `;
  await pool.query(query);
};

module.exports = { createUserTable };
