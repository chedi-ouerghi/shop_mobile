const express = require('express');
const { 
  addAlcoolProduct, 
  getAlcoolProducts, 
  getAlcoolProductById, 
  getBestAlcoolProducts, 
  getAlcoolProductsByType,
  getAlcoolTypes, 
  updateAlcoolProduct
} = require('../controllers/alcoolProductController');

const router = express.Router();

router.post('/add', addAlcoolProduct);
router.put('/alcoolproducts/:id', updateAlcoolProduct);
router.get('/', getAlcoolProducts); 
router.get('/best', getBestAlcoolProducts); 
router.get('/:id', getAlcoolProductById); 
router.get('/type/:type', getAlcoolProductsByType); 
router.get('/types', getAlcoolTypes);

module.exports = router;
