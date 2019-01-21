const ErrorDTO = require('../dto/ErrorDTO');


const errorObj={
    name:'erro object detail'
}

const newP= new ErrorDTO( ErrorDTO.ERROR_TYPES.INFO, 'this is error message',errorObj);
console.log(newP.getMessage());
console.log(newP.getErrorObject());