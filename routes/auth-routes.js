const router = require('express').Router();
const passport = require('passport');


router.get('/logout', (req, res) => {
    res.render('log-out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/logged', (req, res) => {
    res.render('logged');
})


router.get('/google/callback', (req, res) => {
    res.render('logged');
    /*
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    })
    */

    }
);

module.exports = router;


