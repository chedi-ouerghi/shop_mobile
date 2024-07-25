const pool = require('../config/db');

const createNFTProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS nftproduct (
      id INT AUTO_INCREMENT PRIMARY KEY,
      titre VARCHAR(255),
      description TEXT,
      prix DECIMAL(10, 2),
      date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      dispo BOOLEAN,
      qte INT,
      url VARCHAR(255)
    );
  `;
  await pool.query(query);
};

module.exports = { createNFTProductTable };
