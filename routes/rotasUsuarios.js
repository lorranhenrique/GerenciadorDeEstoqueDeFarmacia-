const express = require('express');
const router = express.Router();
const {requireAuth} = require('../middleware/authMiddleware');
const userController = require ('../controllers/userController');

router.get('/usuarios',requireAuth,userController.user_index)
router.post('/usuarios',requireAuth,userController.user_post)
router.get('/usuarios/:id',requireAuth,userController.user_index_det)
router.delete('/usuarios/:id',requireAuth,userController.user_delete)
router.put('/usuarios/:id',requireAuth,userController.user_put)

module.exports = router