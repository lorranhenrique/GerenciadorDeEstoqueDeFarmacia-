const express = require('express');
const router = express.Router();
const authController = require ('../controllers/authController')

router.post('/autentificar', authController.auth_post);

module.exports = router