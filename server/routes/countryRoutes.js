const _ = require('lodash');
//const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
//const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { authenticate } = require('../middlewares/authenticate');

const Country = mongoose.model('Country');

module.exports = app => {
    const delay = ms => new Promise(_ => setTimeout(_, ms));
    app.get('/api/country/:country', async (req, res) => {

        const country = req.params.country;
        await delay(3000);
        const countries = await Country.find({ country: new RegExp('^' + country, 'i') })

        res.send(countries);
    });
};
