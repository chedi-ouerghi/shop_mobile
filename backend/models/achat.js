const pool = require('../config/db');

const createAchatTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS achat (
      ididachat INT AUTO_INCREMENT PRIMARY KEY,
      idproduct INT,
      iduser INT,
      date_achat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      valideachat BOOLEAN,
      FOREIGN KEY (idproduct) REFERENCES nftproduct(id),
      FOREIGN KEY (iduser) REFERENCES login(id)
    );
  `;
  await pool.query(query);
};

module.exports = { createAchatTable };
