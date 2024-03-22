const { check } = require('express-validator');

exports.attendanceValidation = [
    check('firstName', 'At least a name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })
 
]

