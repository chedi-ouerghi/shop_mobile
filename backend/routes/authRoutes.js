const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:id',authenticate, getProfile);

module.exports = router;
