const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const path = require('path');
require('./models/User');
require('./models/Survey');
require('./models/Blog');
require('./models/Country');
require('./services/passport');

//var GoogleStrategy = require('passport-google-oauth20').Strategy;

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
/*app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);*/
app.use(passport.initialize());
//app.use(passport.session());


app.get("/api/images/:imageName", (req, res) => {
    console.log('***********aaaaaaaaaaaaaaaaaa');
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, "uploads/"+imageName));
    //res.send();
   // next()
  });

  //app.use("/api/images", express.static(path.join(__dirname, "uploads")));

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/authRoutesLocal')(app);
require('./routes/authJwtRoutes')(app);
require('./routes/countryRoutes')(app);
require('./routes/fileUploadRoutes')(app);

app.get('/', (req, res) => {
    res.send({hi:'buddy'});
});

// client id : 352649846414-njfm45nifg3rflhusmb78rrpt5soovgc.apps.googleusercontent.com
//client_secret":"wSU59XmWbIPMfab9voH19mnk

app.listen(5000);