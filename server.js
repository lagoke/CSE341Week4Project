const createError = require('http-errors');

const express = require('express');

const mongodb = require('./data/database');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const { attendanceValidation } = require('./middleware/validation.js');

const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;




const port =3000

app.listen(process.env.PORT || port);


app
.use(bodyParser.json())

.use(session ({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

// This is the basic express session... Initialization
.use(passport.initialize())
// init passport in every route call
.use(passport.session())
//.use()

.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type,Accept, Z-Key, Authorization'
    );


    res.setHeader('Access-Control-Allow-Methods', 'GET,POST, PUT, PATCH, DELETE, OPTIONS');
next();

})

.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({origin: '*'}))

app.use('/', require('./routes/index.js')); 

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
   
function(accessToken, refeshToken, profile, done) {
    return done(null, profile);
}
    ));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);

});

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `logged in as: ${req.session.user.displayName}` : "logged out")});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }), 
    (req, res) =>  {
    req.session.user = req.user;
    res.redirect('/')  ;
});



// Handling Errors
/*
app.use((err, req, res, next) => {

    // console.log(err);

    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error";

    res.status(err.statusCode).json({

      message: err.message,

    });

});
*/


mongodb.initDb((err) =>{

    if(err) {
        console.log(err);
    }

    else{

       
console.log('Databse is listening and Node is running on  port ' + (process.env.PORT || port));

    }



}
);

