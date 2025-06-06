const WebSocket = require('ws')
const redis = require('redis')
const url = require('url');

const wss = new WebSocket.Server({ port: 8080 })
console.log('WebSocket Server running on ws://localhost:8080');


wss.on('connection', async (ws, req) => {
    const parsed_url = url.parse(req.url, true)
    const email = parsed_url.query.email

    if (!email) {
        ws.send(JSON.stringify({ message: 'No email send in the query params' }))
        ws.close()
        return;
    }

    console.log("New web socket connection " + email)

    const subClient = redis.createClient()
    try {
        await subClient.connect()
        console.log('Connected to Redis')
    } catch (error) {
        console.log("Failed to connect to Redis...............Quiting wss server " + error)
        ws.close()
        return;
    }


    await subClient.subscribe(email, (message, channel) => {
        console.log(`new message on ${channel} : ${message}`)
        ws.send(JSON.stringify({ event: 'incoming call', message: JSON.parse(message) }))
    })
    console.log("Subscribed to Redis on " + email + " channel")
    

    wss.on('close', () => {
        console.log('wss server closing for ' + email)
        subClient.unsubscribe(email)
        subClient.quit()
    })

})
