const express = require('express');
const { addAchat, updateAchat, getAchatById, getAllAchats,getAchatsByUserId } = require('../controllers/achatController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add', authenticate, addAchat);
router.put('/update/:id', authenticate, updateAchat);
router.get('/:id', authenticate, getAchatById);
router.get('/', authenticate, getAllAchats);
router.get('/user/:iduser', authenticate, getAchatsByUserId);

module.exports = router;
