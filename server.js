const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passport = require('passport');
const mongoose = require('mongoose');
const port = 3000;
const app = express();
const GoogleStrategy = require('passport-google-oauth20');
const config = require('./config/config');

mongoose.connect('mongodb://localhost/usersDB');

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done)  => {
    done(null, obj);
});

passport.use(
    new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    }, () => {
        (accessToken, refreshToken, profile, cb) => {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        };
        cb(null, profile);
    }}
));

app.set('view engine', 'pug');

app.use('/auth', authRoutes);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});