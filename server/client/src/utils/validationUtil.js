import Logger from 'logger'

/* Note: 
1. value passed to validator by redux is, value,all form values, and prop . 
  so if component doesn's pass second value it will be object with form data.

2. value passed by redux for radio can be number or string, for date is passed  object  */

const logger = Logger('ValidationUtils');

export const required = (value = '', errorMessage = 'Field') => {
  var error = 'Field';
 
  if (typeof errorMessage === 'string') {
    error = errorMessage;
  }
  //if value passed is string, then remove the spaces
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${error} is Required !`;
  }
}
