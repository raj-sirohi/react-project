const mongoose = require('mongoose');
const { Schema } = mongoose;

const countrySchema = new Schema({
    country: {
        type: String,
        required: true,
        trim: true,
       
        unique: true
    },
    value: {
        type: String
       
    },
    code: {
        type: String,
       
    }
   
   
});

mongoose.model('Country', countrySchema);
