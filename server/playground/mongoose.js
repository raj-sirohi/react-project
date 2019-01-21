const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/emailyDev');
const uuid = require('uuid/v1');

const userSchema = new Schema({
    _id:String,
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

var User = mongoose.model('User', userSchema);
const generatedId = uuid();
console.log('uuid:',generatedId);
const user = new User({
    _id:generatedId,
    idType: 'LOCAL',
    lastName:"sirohi",
    firstName:"rajesh",
    email:"test@gmail.com",
    password:"test",
    dateCreate: Date.now()
});

user.save().then(()=>{
console.log('user saved');
}).catch(error=>{
console.log('error saving', error);
});