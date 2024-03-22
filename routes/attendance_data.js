const express = require('express')
const router = express.Router();
const { attendanceValidation } = require('../middleware/validation');

const { isAuthenticated } = require('../middleware/authenticate');

const attendanceController = require('../controllers/attendance_data')

router.get('/', attendanceController.getAll);
router.get('/:id', attendanceController.getSingle);
router.post('/', isAuthenticated, attendanceController.createAttendance);
router.put('/:id', isAuthenticated, attendanceController.updateAttendance);
router.delete('/:id', isAuthenticated, attendanceController.deleteAttendance);



module.exports = router; 

