const mongoose = require('mongoose');
const User = mongoose.model('users');
const ErrorDTO = require('../dto/ErrorDTO');

var validateSignUp = (req, res, next) => {
const emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const { firstName='', lastName='', email='', password='' } = req.body;
  console.log('authenticate-validateSignUp', email);
  var errorMessage = "";
  if (!!password) {
    if (password.trim().length < 2) {
      errorMessage = "Password cannot be less then 2 characters";
    }
  }
  else {
    errorMessage = "Password is required";
  }

  if (!!email){

    if (email.trim().length == 0) {
      if (errorMessage.trim().length == 0) {
        errorMessage = "Email is required";
      } else {
          errorMessage += ', Email is required'
      }
    }else{
      if (!emailRegexp.test(email.trim())){
        if (errorMessage.trim().length == 0) {
        errorMessage ='Invalid email, provide valid email'
      }else{
        errorMessage += ', Invalid email, provide valid email'
      }
    }
  }

  }else{
    if (errorMessage.trim().length == 0) {
      errorMessage = "Email is required";
    } else {
        errorMessage += ', Email is required'
    }
  }

 

  if (firstName.trim().length == 0) {
    if (errorMessage.trim().length == 0) {
      errorMessage = "First Name is required";
    } else {
      errorMessage += ', First Name is required'
    }
  }

  console.log('QQQQQQQQQQqqqqqqqqqqqqqq lastName',lastName);
  if (!!lastName){
    if (lastName.trim().length == 0) {
      if (errorMessage.trim().length == 0) {
        errorMessage = "Last Name is required";
      } else {
        errorMessage += ', Last Name is required'
      }
    }
  }
 

  if (!!errorMessage) {
    const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.ERROR, errorMessage, 'authenticate-validateSignUp', null);
    return res.status(401).send(errorDTO.toJSON());
  }
  next();
}


var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  console.log('Authenicate')
  console.log('***** findByToken token:', token);
  User.findByToken(token).then((user) => {
    console.log('***** findByToken AAA:');
    if (!user) {
      console.log('***** findByToken BBB:');
      return Promise.reject(new Error('user not found by token'));
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    const errorObj = {
      name: 'erro object detail'
    }
    const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.ERROR, 'Not authorize to access this path', 'authenticate', e);
    console.log('*****errorDTO e:', e);
    console.log('******errorDTO:', errorDTO.getType() + ',' + errorDTO.getMessage() + ', ' + errorDTO.getErrorObject());
    res.status(401).send(errorDTO.toJSON());
  });
};

module.exports = { authenticate, validateSignUp };
