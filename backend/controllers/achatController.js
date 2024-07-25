const pool = require('../config/db');

const addAchat = async (req, res) => {
  const { idproduct, valideachat } = req.body;
  const iduser = req.userId;

  const query = `
    INSERT INTO achat (idproduct, iduser, valideachat)
    VALUES (?, ?, ?);
  `;

  try {
    for (let productId of idproduct) {
      await pool.query(query, [productId, iduser, valideachat]);
    }
    res.status(200).json({ message: 'Achat ajouté avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'achat:', error);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'achat' });
  }
};


const updateAchat = async (req, res) => {
  const { id } = req.params;
  const { valideachat } = req.body;

  const query = `
    UPDATE achat
    SET valideachat = ?
    WHERE ididachat = ?;
  `;
  const [rows] = await pool.query(query, [valideachat, id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Achat not found' });
  }

  res.json(rows[0]);
};

const getAchatById = async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM achat WHERE ididachat = ?';
  const [rows] = await pool.query(query, [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Achat not found' });
  }

  res.json(rows[0]);
};

const getAllAchats = async (req, res) => {
  const query = 'SELECT * FROM achat';
  const [rows] = await pool.query(query);
  res.json(rows);
};

const getAchatsByUserId = async (req, res) => {
  const { iduser } = req.params;
  const query = 'SELECT * FROM achat WHERE iduser = ?';
  const [rows] = await pool.query(query, [iduser]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'Aucun achat trouvé pour cet utilisateur' });
  }

  res.json(rows);
};


module.exports = { addAchat, updateAchat, getAchatById, getAllAchats,getAchatsByUserId };
