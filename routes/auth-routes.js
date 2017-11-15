const router = require('express').Router(),
    passport = require('passport');


router.get('/logout', (req, res) => {
    res.render('log-out');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/callback', (req, res) => {
    res.render('logged')
    }
);

module.exports = router;