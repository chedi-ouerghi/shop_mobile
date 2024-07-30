const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const alcoolProductRouter = require('./routes/alcoolProductRouter');
const achatRoutes = require('./routes/achatRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Configurer le CORS pour accepter toutes les origines

app.use('/auth', authRoutes);
app.use('/alcool', alcoolProductRouter);
app.use('/achat', achatRoutes);

const PORT = process.env.PORT || 5452;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
