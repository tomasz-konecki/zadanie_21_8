const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20'),
    config = require('./config');
 

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