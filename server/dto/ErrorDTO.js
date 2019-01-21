
const ERROR_TYPES = {
    SYSTEM: 'SYSTEM',
    ERROR: 'ERROR',
    WARNING: 'WARNING',
    INFO: 'INFO'
}

class ErrorDTO {
    constructor(type, message, method,detailErrorObject) {
        let _type = type;
        let _message = message;
        let _method=method;
        let _createTime = Date.now();
        let _detailErrorObject = detailErrorObject;

        this.setType = (type) => {
            _type = type
        }

        this.getType = () => _type;

        this.setMessage = (message) => {
            _message = message.trim();
        }
        this.getMessage = () => _message;

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

    toJSON(){
        return{
            type:this.getType(),
            message:this.getMessage(),
            method:this.getMethod(),
            detailErrorObject:this.getDetailErrorObject(),
            createTime:this.getCreateTime()
        }
    }

}

module.exports = ErrorDTO;