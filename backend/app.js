const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const authRoutes = require('./routes/authRoutes');
const alcoolProductRouter = require('./routes/alcoolProductRouter');
const achatRoutes = require('./routes/achatRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(process.env.AUTH_PATH, authRoutes);
app.use(process.env.ALCOOL_PATH, alcoolProductRouter);
app.use(process.env.ACHAT_PATH, achatRoutes);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
