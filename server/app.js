const express = require('express')
const { createServer } = require('http')
const dotenv = require('dotenv')
const dbService = require('./utils/dbService')
const AuthRouter = require('./routes/auth.routes')
const CloudinaryRouter = require('./routes/cloudinary.routes')
const UserRouter = require('./routes/user.routes')
const cors = require('cors')
const authMiddleware = require('./middleware/authmiddleware')
const redis = require('./config/redisclient')


dotenv.config()
const PORT = process.env.BACKEND_BASE_URL || 8000
const MONGO_DB_URI = process.env.MONGO_DB_URI

const app = express()
const myserver = createServer(app)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let dbConn;
(async () => {
    dbConn = await new dbService().dbConnect(MONGO_DB_URI.toString())
})()



app.get('/', async (req, res) => {
    return res.status(200).json({ message: 'Hello from server' })
})

app.use('/auth', AuthRouter)
app.use('/cloudinary', authMiddleware, CloudinaryRouter)
app.use('/user', authMiddleware, UserRouter)




myserver.listen(PORT, async () => {
    try {
        await redis.connect()
    } catch (err) {
        console.log("Error in connecting Redis " + err)
    }
    console.log("server started")
})

module.exports = { dbConn }