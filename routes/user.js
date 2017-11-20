const express = require('express'),
    passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn(),
    router = express.Router();

/* GET user profile. */
router.get('/', ensureLoggedIn, (req, res, next) => {
    console.log(req.user);
    res.render('user', {
        user: req.user
    });
});

router.get('/profile', ensureLoggedIn, (req, res, next) => {

    res.render('profile', { user: req.user }); 
});

router.post('/profile', ensureLoggedIn, (req, res, next) => {
    const {givenName, surname, streetAddress, city, state, zip} = req.body;
    let errors = [];

    if(!givenName || !givenName.trim()) {
        errors.push({
            error: 'First name is required'
        })
    }
    if(!surname || !surname.trim()) {
        errors.push({
            error: 'Surname is required'
        })
    }
    if(!streetAddress || !streetAddress.trim()) {
        errors.push({
            error: 'Street address is required'
        })
    }
    if(!city || !city.trim()) {
        errors.push({
            error: 'City is required'
        })
    }
    if(!state || !state.trim()) {
        errors.push({
            error: 'State name is required'
        })
    }
    if(!zip || !zip.trim()) {
        errors.push({
            error: 'ZIP is required'
        })
    }

    res.render('profile', {
        givenName: req.user.name.givenName,
        surname,
        streetAddress,
        city,
        state,
        zip,
        errors,
        saved: errors.length === 0
    })

})

module.exports = router;
