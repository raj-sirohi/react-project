const PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`.
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const countryCode ='gb';
const exampleNumberVal =phoneUtil.getExampleNumber(countryCode);
console.log('exampleNumberVal:',exampleNumberVal);
const a=exampleNumberVal['values_'];
const exampleNumber = a['2'];
const exampleCountryCode=a['1']
console.log('exampleNumber:',exampleNumber);
console.log('exampleCountryCodeNumber:',exampleCountryCode);

const testNumber ='01212305679'; // exampleNumber.toString();
const number = phoneUtil.parseAndKeepRawInput(testNumber, countryCode);
 
// Print the phone's country code.
console.log('countryCode:',number.getCountryCode());

console.log('isValid:',phoneUtil.isValidNumber(number));

console.log('counryCode:',phoneUtil.getRegionCodeForNumber(number));

console.log('nationalNumber:',number.getNationalNumber());

console.log('nationalFormat:',phoneUtil.format(number, PNF.NATIONAL));
const nationalFormat = phoneUtil.format(number, PNF.NATIONAL);

const repSpaceWithDash = nationalFormat.replace(/ /g, "-");
const replaceFirstZero = repSpaceWithDash.replace(/^0+/, '')
const formatMask2 = replaceFirstZero.replace(/\d/g, "9");

console.log('formatMast2:',formatMask2);



