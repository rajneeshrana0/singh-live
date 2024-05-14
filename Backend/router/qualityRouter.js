const express = require('express');
const router = express.Router();
const qualityController = require('../controller/qualityController');

router.post('/', qualityController.createQuality);
router.get('/', qualityController.getAllQualities);
router.put('/:id', qualityController.updateQuality);
router.delete('/:id', qualityController.deleteQuality);

module.exports = router;
