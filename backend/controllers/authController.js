const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password, num_telephone, adresse, code_postal, date_naissance, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO login (name, email, password, num_telephone, adresse, code_postal, date_naissance, role)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const [rows] = await pool.query(query, [name, email, hashedPassword, num_telephone, adresse, code_postal, date_naissance, role]);

  const token = jwt.sign({ userId: rows.insertId, role }, 'secretKeyChedi');
  res.json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM login WHERE email = ?`;
  const [rows] = await pool.query(query, [email]);

  if (rows.length === 0 || !await bcrypt.compare(password, rows[0].password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: rows[0].id, role: rows[0].role }, 'secretKeyChedi');
  res.json({ token });
};

const getProfile = async (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM login WHERE id = ?`;
  const [rows] = await pool.query(query, [id]);

  if (rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(rows[0]);
};

module.exports = { register, login, getProfile };
