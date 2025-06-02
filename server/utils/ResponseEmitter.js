class ResponseEmitter{
    constructor(res){
        this.res = res
    }
    successfull(message="Successfull" , data=null){
        return this.res.status(200).json({
            message : message,
            data : data
        })
    }
    badRequest(message="bad Request"){
        return this.res.status(400).json({
            message : message
        })
    }
    unauthorized(message="unauthorized"){
        return this.res.status(401).json({
            message : message
        })
    }
    forbidden(message="forbidden"){
        return this.res.status(403).json({
            message : message
        })
    }
    internalServerError(message="Internal Server Error"){
        return this.res.status(500).json({
            message : message
        })
    }
    customeResponse(status =200, message="", data=null){
        return this.res.status(status).json({
            message : message,
            data: data
        })
    }
}

module.exports = ResponseEmitter