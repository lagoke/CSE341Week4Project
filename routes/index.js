const router = require('express').Router()


const passport = require('passport');

router.use('/', require('./swagger'));


/*
router.get('/', (req, res) => {
    res.send("Welcome to Web service week 4 Church Attendance Project");
})
*/
router.use('/attendance_data', require('./attendance_data'));
router.use('/minister_data', require('./minister_data'));


router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if(err) {return next(err); }
        res.redirect('/');
    });
});


module.exports = router; 