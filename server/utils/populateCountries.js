// this is for loading countries in mongo collections.
// from comman line run node populateCountries

const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect('mongodb://localhost:27017/emailyDev');
const uuid = require('uuid/v1');
//const Country = require('../models/Country');
const countries = require('./country') 

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

var Country = mongoose.model('Country', countrySchema);

const saveCountry=(country,value,code)=>{
    const countryModel = new Country({
        country,
        value,
        code
    });
    
    countryModel.save().then(()=>{
    console.log('country saved');
    }).catch(error=>{
    console.log('error saving', error);
    });
}


countries.forEach((country)=>{
    saveCountry(country.country,country.value,country.code);
    console.log(country);
    })
   