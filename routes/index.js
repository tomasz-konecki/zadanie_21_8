const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv').load();
const router = express.Router();
const User = require('../models/models');

const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL:
        process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback'
};

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index');
});


router.get('/login', passport.authenticate('auth0', {
    clientID: env.AUTH0_CLIENT_ID,
    domain: env.AUTH0_DOMAIN,
    redirectUri: env.AUTH0_CALLBACK_URL,
    responseType: 'code',
    audience: 'https://' + env.AUTH0_DOMAIN + '/userinfo',
    scope: 'openid profile'}),
        (req, res) => {
            const address = new User();
                address.givenName = req.user.givenName;
                address.surname = req.user.surname;
                address.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    res.json('Address added to DB');
                    res.redirect("/");
                })
        }
);

router.get('/logout', (req, res) => { 
    req.logout();
    res.redirect('/');
});

router.get('/callback',
    passport.authenticate('auth0', {
        failureRedirect: '/failure'
    }),
    (req, res) => {
        res.redirect(req.session.returnTo || '/user');
    }
);

router.get('/failure', (req, res) => {
    const error = req.flash("error");
    const error_description = req.flash("error_description");
    req.logout();
    res.render('failure', {
        error: error[0],
        error_description: error_description[0],
    });
});

module.exports = router;
