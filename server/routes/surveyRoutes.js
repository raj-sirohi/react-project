const _ = require('lodash');
//const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
//const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const {authenticate} = require('../middlewares/authenticate');

const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys', async (req, res)=>{

      const survey = await  Survey.findOne();

      res.send(survey);

    });

    app.post('/api/surveys',authenticate,  async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
          _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            //req.user.credits -= 1;
          //  const user = await req.user.save();

            res.send(survey);
        } catch (err) {
            res.status(422).send(err);
        }
    });
};
