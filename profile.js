const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const express = require('express');
const extend = require('xtend');
const forms = require('forms');
const fields = forms.fields;
const User = require('./models/models');

const profileForm = forms.create({
    givenName: fields.string({ required: true }),
    surname: fields.string({ required: true }),
    streetAddress: fields.string(),
    city: fields.string({ required: true }),
    state: fields.string(),
    zip: fields.string()
});


const renderForm = (req, res, locals) => {
    res.render('profile', extend({
        title: 'User Profile',
        csrfToken: req.csrfToken(),
        givenName: req.user.name.givenName,
        surname: req.user.name.familyName,
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
    },
        locals || {}));
}

module.exports = function profile() {
    const router = express.Router();
        router.use(cookieParser());
        router.use(bodyParser.urlencoded({ extended: true }));
        router.use(csurf({ cookie: true }));

    router.all('/', (req, res) => {
        profileForm.handle(req, {
            success: (form) => {
                const person = new User();
                person.givenName = form.data.givenName;
                person.surname = form.data.surname;
                person.city = form.data.city;
                
                person.save((err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('\nDocument:\n' + person + '\n...added to DB\n');
                });
                renderForm(req, res, {
                    saved: true,
                    givenName: form.data.givenName,
                    surname: form.data.surname,
                    streetAddress: form.data.streetAddress,
                    city: form.data.city,
                    state: form.data.state,
                    zip: form.data.zip
                });
            },

            error: (form) => {
                let errors = [];
                if(!form.data.givenName || !form.data.givenName.trim()) {
                    errors.push({
                        error: 'First name is required'
                    })
                }
                if(!form.data.surname || !form.data.surname.trim()) {
                    errors.push({
                        error: 'Surname is required'
                    })
                }
                if(!form.data.city || !form.data.city.trim()) {
                    errors.push({
                        error: 'City is required'
                    })
                }

                renderForm(req, res, {
                    errors,
                    givenName: form.data.givenName,
                    surname: form.data.surname,
                    streetAddress: form.data.streetAddress,
                    city: form.data.city,
                    state: form.data.state,
                    zip: form.data.zip
                });
            },

            empty: (form) => {
                renderForm(req, res);
            }
        });
    });

    return router;
};