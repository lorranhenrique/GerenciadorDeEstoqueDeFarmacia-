const express = require('express');
const router = express.Router();
const index = require('../controllers/404Controller')

router.use(index.index);

module.exports = router;