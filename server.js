const express = require('express'),
    authRoutes = require('./routes/auth-routes'),
    passport = require('passport'),
    passportSetup = require('./config/passport-setup'),
    port = 3000,
    app = express();


app.set('view engine', 'pug');
//app.set('views', './views');
app.use('/auth', authRoutes);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.render('index');
});


app.listen(port, () => {
    console.log(`listening on port ${port}`);
});