const User = require('./models');

const address = new User();

address.givenName = req.user.givenName;
address.surname = req.user.surname;

address.save((err) => {
    if (err) {
        console.log(err);
    }
    res.json('Address added to DB');
});