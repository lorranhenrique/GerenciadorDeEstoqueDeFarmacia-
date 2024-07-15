const express = require('express');
const router = express.Router();
const farmacoController = require('../controllers/farmacosController')
const {requireAuth} = require('../middleware/authMiddleware');


router.get('/farmacos',requireAuth,farmacoController.faramaco_index)
router.post('/farmacos',requireAuth,farmacoController.faramaco_post)
router.get('/farmacos/:id',requireAuth,farmacoController.faramaco_index_det)
router.delete('/farmacos/:id',requireAuth,farmacoController.faramaco_delete)
router.put('/farmacos/:id',requireAuth,farmacoController.faramaco_put);


module.exports = router