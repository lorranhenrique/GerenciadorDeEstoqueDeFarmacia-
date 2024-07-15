const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const loginController = require('../controllers/loginController')
const logoutController = require('../controllers/logoutController');

router.get('/logout',logoutController.logout_index);
router.post('/login',loginController.login_post )
router.get('/',loginController.login_index)

module.exports = router;