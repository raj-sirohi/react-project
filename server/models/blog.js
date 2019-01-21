const mongoose = require('mongoose');
const { Schema } = mongoose;


const blogSchema = new Schema({
    title: {
        type:String,
        required: true
    },
    subject: String,
    body: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    createDate: Date,
    updateDate: Date,
    deleted:{type:Boolean,default:false}
});

mongoose.model('Blog', blogSchema);