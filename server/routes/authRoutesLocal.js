const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const AuthenticationController = require('../controllers/authenticationControllerLocal');
const passportService = require('../services/passportLocal');


// validated email and password
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, keys.jsonTokenKey);
}

module.exports = app =>{

    app.post('/api/requireAuth',requireAuth, (req, res)=>{
        res.send({ message: 'authenticated'});


    })

    app.post('/api/signup',AuthenticationController.signup);

    app.post('/api/signin',requireSignin,AuthenticationController.signin);

    app.get('/api/user/:id', function (req, res) {

        var userId = req.params.id;

        User.findById(userId, function (err, user) {
            if (err) {
                res.status(422).send({error: err, message: 'error finding user with id:'})
            }

            if (user) {
                res.send(user)
            }
        });
    })

    app.put('/api/user/:id', async function (req, res) {

        const id = req.params.id;

        const {lastName, firstName, gender, dob, email, password} = req.body;

        let user = {
            lastName,
            firstName,
            email,
            password,
            dob,
            gender
        };

        try {
            const updatedUser = await User.findByIdAndUpdate(
                id,
                {$set: user},
                {new: true}
            );

            res.send(updatedUser)
        } catch (e) {
            console.log('Error', e);
            return res.status(422).send({

                error: {error: 'e', errorMessage: 'cannot update user'}
            });
        }
    })






}



