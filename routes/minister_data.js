const express = require('express')
const router = express.Router();
const { ministerValidation } = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');

const ministerController = require('../controllers/minister_data')

router.get('/', ministerController.getAll);
router.get('/:id', ministerController.getSingle);
router.post('/', isAuthenticated, ministerController.createminister);
router.put('/:id', isAuthenticated, ministerController.updateminister);
router.delete('/:id', isAuthenticated, ministerController.deleteminister);



module.exports = router; 

