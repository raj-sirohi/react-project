const mongoose = require('mongoose');
const { Schema } = mongoose;
const becrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const Logger = require('../logger/winston');
const uuid = require('uuid/v1');
const ErrorDTO = require('../dto/ErrorDTO');

const logger = Logger('User');

const userSchema = new Schema({
    googleId: String,
    idType:String,
    lastName:String,
    firstName:String,
    gender:String,
    dob:Date,
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        unique: true
    },
    password: {
        type: String,

        minlength: [2, 'Password cannot be less then 2 characters']
    },
    tokens: [{
        _id:String,
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    dateCreate:Date
});

// On Save Hook, encrypt password
// Before saving a model, run this function
// pre save only fires on create, not on update
/*userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;
    console.log('Pre save');
    // generate a salt then run callback
    becrypt.genSalt(10, function(err, salt) {
        if (err) { return next(err); }

        // hash (encrypt) our password using the salt
        becrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) { return next(err); }

            console.log('password:',user.password);
            console.log('hash:',hash);
            // overwrite plain text password with encrypted password
            user.password = hash;
            next();
        });
    });
});*/

userSchema.methods.comparePassword = function(candidatePassword, callback) {
    logger.info('comparePassword',candidatePassword);
    becrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
}

userSchema.statics.createGoogleUser=function(user){
    var access='auth'
    var tokenId = uuid();
    var token = jwt.sign({_id: user._id.toHexString(),tokenId, access}, 'abc123').toString();
    user.tokens.push({access, token});
    return user.save()
        .then(()=>{
            return token;
        })
        .catch(error=>{
            return error;
        })
};

userSchema.statics.createWithToken=function(user){

    return generateHashPassword(user.password)
         .then(hash=>{
             user.password=hash;
             console.log('inside createWithToken AAAA');
             var tokenId = uuid();
             console.log('inside createWithToken BBB');
             var access='auth'
             var token = jwt.sign({_id: user._id.toHexString(),tokenId, access}, 'abc123').toString();
             user.tokens.push({_id:tokenId,access, token});
             console.log('inside createWithToken CCC');
             return user.save()
                 .then(()=>{
                     console.log('inside createWithToken DDDD');
                     return token
                 })
                 // following is not needed, when there is error implicity promised is rejected
                 // and caught by the outer catch block
                //  .catch(error=>{
                //     console.log('AAAAAAAAAAAinside createWithToken error',error);
                //     const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM,`AAA failed to create user:${user}`,'User-createWithToken',error);
                //     return Promise.reject(errorDTO);
                // })
         })
         .catch(error=> {
            console.log('BBBBBBBBBBinside createWithToken ERROR',error);
            const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM,`failed to create user with email:${user.email}`,'User-createWithToken',error);
             return Promise.reject(errorDTO)});
 
 };

/* userSchema.statics.createWithToken=function(user){

   return generateHashPassword(user.password)
        .then(hash=>{
            user.password=hash;
            console.log('inside createWithToken AAAA');
            var tokenId = uuid111();
            console.log('inside createWithToken BBB');
            var access='auth'
            var token = jwt.sign({_id: user._id.toHexString(),tokenId, access}, 'abc123').toString();
            user.tokens.push({_id:tokenId,access, token});
            console.log('inside createWithToken CCC');
            return user.save()
                .then(()=>{
                    console.log('inside createWithToken DDDD');
                    return token
                })
        })
        .catch(error=>console.log('error inside create with token',error))

}; */

const generateHashPassword =(password)=>{

    return new Promise((resolve,reject)=>{
        becrypt.genSalt(10, function(err, salt) {
            if (err) { return reject(err); }

            // hash (encrypt) our password using the salt
            becrypt.hash(password, salt, null, function(err, hash) {
                if (err) { return reject(err); }

                console.log('success')
                return resolve(hash);
            });
        });

    })
};

userSchema.methods.generateAuthToken = function () {
    var user = this;
    var tokenId = uuid();
    var access = 'auth';
    
    var token = jwt.sign({_id: user._id.toHexString(), tokenId,access}, 'abc123').toString();

    user.tokens.push({_id:tokenId,access, token});

    return user.save().then(() => {
        return token;
    })
        .catch(error=>{
            console.log('generate token error',error);
            return error
        });
};

userSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
        console.log('decoded._id:',decoded);
    } catch (e) {
        console.log('jwt token verify error:',e);
        const errorDTO = new ErrorDTO(ErrorDTO.ERROR_TYPES.SYSTEM,`JWT token failed to verify token:${token}`,'User-findByToken',e)
        return Promise.reject(errorDTO);
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    },'firstName lastName'); // only return first name , lastName
};

userSchema.statics.deleteToken= function(token){
    var User = this;
    var decoded;
    var tokenId;
    try {
        decoded = jwt.verify(token, 'abc123');
        tokenId = decoded.tokenId;
        console.log('decoded._id:',decoded);
        
    } catch (e) {
        return Promise.reject();
    }

   return User.findOneAndUpdate({
        '_id': decoded._id,
      }, {
        $pull: { tokens: { _id: tokenId } }
      },{new:true, fields:{'firstName':1, 'lastName':1}});
   
}

mongoose.model('users', userSchema);
