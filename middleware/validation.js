const { check } = require('express-validator');


exports.attendanceValidation = [
   // check('firstName', 'At least a name is requied').not().isEmpty(),

      // first Name validation
  check('firstName').trim().notEmpty().withMessage('First Name required')
  .matches(/^[a-zA-Z ]*$/).withMessage('Only Characters with white space are allowed'),

  check('email').notEmpty().withMessage('Email Address required').normalizeEmail().isEmail().withMessage('must be a valid email')

    //check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true })
 
]