const mongoose = require('mongoose');
const User = mongoose.model('users');
const passport = require('passport');
const jwt = require('jwt-simple');
const keys = require('../config/keys');
const Logger = require('../logger/winston');
const _ = require('lodash');
const ErrorDTO = require('../dto/ErrorDTO');
const authenticate = require ('../middlewares/authenticate');
  
const logger = Logger('authJwtRoutes');
module.exports = app => {

    app.post('/api/signin2', (req, res) => {
        const {email, password} = req.body;
        User.findOne({email: email}, (error, user) => {
            if (error) {
               return res.status(422).send({error: error})
            }
            if (!user) {
               return res.status(422).send({error: 'User not found by email ' + email})
            }

           logger.info('inside /api/signin2, before compare password');
            user.comparePassword(password, (error, isMatch) => {

                if (error) {
                   return res.status(422).send({error: error});
                }
                if (!isMatch) {
                    res.status(422).send({error: "invalid password111"})
                } else {
                    user.generateAuthToken()
                        .then(token => {
                            const lightUser = _.pick(user, ['_id', 'email','firstName','lastName']);
                            res.header('x-auth', token).send(lightUser);
                        })
                        .catch(error => {
                            res.status(500).send({error: error})
                        })
                }

            })
        })
    });

    app.post('/api/signup2', authenticate.validateSignUp,function (req, res) {

        console.log('awtJwtRoutes**************** /api/signup2')
        const {firstName, lastName, email, password} = req.body;

        User.findOne({email: email}, (error, existingUser) => {
          
            if (error) {
                const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM, `Error finding user with email:${email}`,'authJwtRoute-api/signup2', error);
                return res.status(500).send({errorDTO});
            }

            // If a user with email does exist, return an error
            if (existingUser) {
                logger.info('user exists with email:');
                const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.ERROR, `User already exists with email:${email}`,'authJwtRoute-api/signup2', null);
              
                return res.status(422).send({errorDTO});
            }

            const user = new User({
                idType: 'LOCAL',
                lastName,
                firstName,
                email,
                password,
                dateCreate: Date.now()
            });
            User.createWithToken(user)

                .then((token) => {
                    console.log('inside /api/signup2 aaaa');
                        res.header('x-auth', token).send(user);
                    }
                )
                .catch(error => {
                    console.log('inside /api/signup2 bbbb error',error);
                    const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM, 'Cannot create user','authJwtRoute-api/signup2', error);
   // console.log('*****errorDTO:',errorDTO);
    console.log('*****  errorDTO.toJSON():',errorDTO.toJSON());
    //console.log('******errorDTO:',errorDTO.getType()+','+errorDTO.getMessage()+', '+errorDTO.getDetailErrorObject());
    res.status(500).send(errorDTO);
                    //res.status(400).send(JSON.stringify(error));
                })
    })
    });

    app.delete('/api/token/:token', (req,res)=>{

        const token = req.params.token;
        User.deleteToken(token)
        .then(user=>{
            console.log('adfter delete token', user);
            res.header('x-auth','').send(user);
        })
        .catch(error=>{
            res.status(400).send({'error':'cannot delete token'})
        })
    })

    // get user by token
    app.get('/api/user/token/:token', (req, res) => {
        const token = req.params.token;
        User.findByToken(token)
            .then(user => {
                res.header('x-auth',token).send(user);
            })
            .catch(error => {
                res.status(400).send({ 'error': 'user not found by token' });
            })
    })


    app.post('/api/signup3', function (req, res) {

        const {firstName, lastName, email, password} = req.body;

        User.findOne({email: email}, (error, existingUser) => {
            if (error) {
                return res.status(500).send({error});
            }

            // If a user with email does exist, return an error
            if (existingUser) {
                return res.status(422).send({error: 'Email is in use'});
            }

            const user = new User({
                idType: 'LOCAL',
                lastName,
                firstName,
                email,
                password,
                dateCreate: Date.now()
            });

            user.save().then(() => {
                return user.generateAuthToken();
            }).then((token) => {
                res.header('x-auth', token).send(user);
            }).catch((error) => {
                res.status(400).send({'error': error});
            })
        })

    });


}