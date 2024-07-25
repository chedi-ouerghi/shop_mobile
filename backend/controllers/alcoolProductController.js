const pool = require('../config/db');

// Ajouter un produit d'alcool
const addAlcoolProduct = async (req, res) => {
  const { titre, description, prix, dispo, qte, url } = req.body;

  try {
    const query = `
      INSERT INTO alcoolproduct (titre, description, prix, dispo, qte, url)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    const [result] = await pool.query(query, [titre, description, prix, dispo, qte, url]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error('Error adding alcohol product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Mettre à jour un produit d'alcool par ID
const updateAlcoolProduct = async (req, res) => {
  const { id } = req.params;
  const { titre, description, prix, dispo, qte, url, type, top } = req.body;

  try {
    // Requête SQL pour mettre à jour le produit d'alcool
    const query = `
      UPDATE alcoolproduct
      SET titre = ?, description = ?, prix = ?, dispo = ?, qte = ?, url = ?, type = ?, top = ?
      WHERE id = ?;
    `;
    
    const [result] = await pool.query(query, [titre, description, prix, dispo, qte, url, type, top, id]);

    // Vérifiez si le produit a été mis à jour
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found or no changes made' });
    }

    // Récupérez le produit mis à jour
    const [updatedProduct] = await pool.query('SELECT * FROM alcoolproduct WHERE id = ?', [id]);

    // Retournez le produit mis à jour
    res.json(updatedProduct[0]);
  } catch (error) {
    console.error('Error updating alcohol product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtenir tous les produits d'alcool
const getAlcoolProducts = async (req, res) => {
  try {
    const query = 'SELECT * FROM alcoolproduct';
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching alcohol products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Obtenir un produit d'alcool par ID
const getAlcoolProductById = async (req, res) => {
  const { id } = req.params;
  try {
    console.log('Fetching alcohol product by ID:', id);
    const query = 'SELECT * FROM alcoolproduct WHERE id = ?';
    const [rows] = await pool.query(query, [id]);

    console.log('Query Result:', rows);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching alcohol product by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Obtenir les meilleurs produits d'alcool
const getBestAlcoolProducts = async (req, res) => {
  try {
    console.log('Fetching best alcohol products...');
    const query = 'SELECT * FROM alcoolproduct WHERE top = 1';
    const [rows] = await pool.query(query);

    console.log('Query Result:', rows);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No top products found' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching best alcohol products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Obtenir les types d'alcool distincts
const getAlcoolTypes = async (req, res) => {
  try {
    console.log('Fetching distinct alcohol types...');
    
    // Requête simplifiée pour récupérer les types distincts
    const query = 'SELECT DISTINCT type FROM alcoolproduct WHERE type IS NOT NULL AND type != ""';
    const [rows] = await pool.query(query);

    // Vérifiez les résultats dans les logs
    console.log('Query Result:', rows);

    if (!rows || rows.length === 0) {
      console.log('No distinct alcohol types found.');
      return res.status(404).json({ error: 'No alcohol types found' });
    }

    // Formater la réponse pour inclure uniquement les types
    const types = rows.map(row => row.type);
    res.json(types);
  } catch (error) {
    console.error('Error fetching alcohol types:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAlcoolProductsByType = async (req, res) => {
  const { type } = req.params;
  console.log('Requested type:', type);

  try {
    const query = 'SELECT * FROM alcoolproduct WHERE type = ?';
    const [rows] = await pool.query(query, [type]);
    
    console.log('Query Result:', rows);

    if (rows.length === 0) {
      console.log('No products found for this type');
      return res.status(404).json({ error: 'No products found for this type' });
    }

    res.json(rows);
  } catch (error) {
    console.error('Error fetching alcohol products by type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = { 
  addAlcoolProduct, 
  updateAlcoolProduct,
  getAlcoolProducts, 
  getAlcoolProductById, 
  getBestAlcoolProducts, 
  getAlcoolProductsByType,
  getAlcoolTypes
};
