const passport = require('passport');
const keys = require('../config/keys');

const mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = mongoose.model('users');

passport.serializeUser((token, done) => {
    console.log('************serializeUser',token)
    done(null, token);
});

passport.deserializeUser((id, done) => {
    console.log('************deserialize')
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
    const lastName= profile.name.familyName;
    const firstName = profile.name.givenName;
    const email = profile.emails[0].value;
    const googleId = profile.id;
    const user = new User({
        idType: 'GOOGLE',
        googleId,
        lastName,
        firstName,
        email,
        dateCreate: Date.now()
    })
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
           const token = await existingUser.generateAuthToken();
           return done(null, token);

           // return done(null, existingUser);
        }
        console.log('creatine new user')
        const token = await new User.createWithToken(user);
        done(null, token);
    }
    )
);
