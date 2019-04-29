
const ERROR_TYPES = {
    SYSTEM: 'SYSTEM',
    AXIOS: 'AXIOS',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFO: 'INFO'
}

class ErrorDTO {
    // t=''; class leve attributes/ instance are defined withou let, conts, var
    // they can be accessed using this.t
    // or they are defined in method using this.t, then it becomes instance property.
    constructor(type, error, method,detailErrorObject) {
        let _type = type;
        let _title ='';
        let _error = error;
        let _method=method;
        let _createTime = Date.now();
        let _detailErrorObject = detailErrorObject;

        this.setType = (type) => {
            _type = type
        }
        this.getType = () => _type;

        this.setTitle = (title) => {
            _title = title
        }

        this.getTitle = () => _title;

        this.setError = (error) => {
            _error = error.trim();
        }
        this.getError = () => _error;

        this.setDetailErrorObject = (detailErrorObject) => {
            _detailErrorObject = detailErrorObject;
        }

        this.getMethod=()=>_method;
        this.getCreateTime =()=>_createTime;

        this.getDetailErrorObject = () => _detailErrorObject;
    }

    static get ERROR_TYPES() {
        return ERROR_TYPES
    }
 
    // this method appears on the prototype of the instance of this class
    toJSON(){
        return{
            type:this.getType(),
            title:this.getTitle(),
            error:this.getError(),
            method:this.getMethod(),
            detailErrorObject:this.getDetailErrorObject(),
            createTime:this.getCreateTime()
        }
    }

}

 export default ErrorDTO;