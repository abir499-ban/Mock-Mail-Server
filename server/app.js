const express = require('express')
const {createServer} = require('http')
const dotenv  = require('dotenv')
const dbService  = require('./utils/dbService')
const AuthRouter = require('./routes/user.routes')


dotenv.config()
const PORT = process.env.BACKEND_BASE_URL || 8000
const MONGO_DB_URI = process.env.MONGO_DB_URI

const app = express()
const myserver = createServer(app)
app.use(express.json())
app.use(express.urlencoded({extended : false}))

let dbConn;
(async() => {
    dbConn = await new dbService().dbConnect(MONGO_DB_URI.toString())
})()



app.get('/', async(req, res)=>{
    return res.status(200).json({message : 'Hello from server'})
})

app.use('/auth' , AuthRouter)




myserver.listen(PORT, ()=>{
    console.log("server started")
})

module.exports = {dbConn}