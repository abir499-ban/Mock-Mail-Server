const mongoose = require('mongoose')

class dbService {
    constructor() {
        this.conn = null
    }

    async dbConnect(uri) {
        if(this.conn) return this.conn

        try {
            this.conn = await mongoose.connect(uri)
            console.log("MongoDB connected")
            return this.conn
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async disconnect(){
        if(!this.conn) return;

        await mongoose.disconnect()
        console.log('MongoDB Disconnected')
    }

    async create(model , query={}){
        try {
            await model.create(query)
            console.log("data saved onto database")
        } catch (error) {
            throw error
        }
    }

    async findOne(model , query={}){
        try {
            const res = await model.findOne(query)
            return res
        } catch (error) {
            throw error
        }
    }

}

module.exports = dbService