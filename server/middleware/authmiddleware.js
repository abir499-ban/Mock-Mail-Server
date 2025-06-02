const User = require("../models/User.schema")
const dbService = require("../utils/dbService")
const { getPayload } = require("../utils/jwtService")
const ResponseEmitter = require("../utils/ResponseEmitter")


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return new ResponseEmitter(res).unauthorized("No auth headers Provided")
        }

        const token = authHeader.split(' ')[1]
        if (!token) return new ResponseEmitter(res).unauthorized("No token provided")
        const payload = await getPayload(token)

        if (!payload.id) return new ResponseEmitter(res).unauthorized("No id in the Payload provided")
        const user = await new dbService().findBy_id(User, payload.id)

        req.user = user
        next()
    } catch (err) {
        console.log(err)
        return new ResponseEmitter(res).internalServerError()
    }

}

module.exports = authMiddleware 