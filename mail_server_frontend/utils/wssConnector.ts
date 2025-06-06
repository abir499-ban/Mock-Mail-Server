

export default function connectToWSS(email : string){
    const ws = new WebSocket(`ws://localhost:8080?email=${email}`)

    ws.addEventListener('open' , ()=>{
        console.log("Connected to web socket")
    })

    ws.addEventListener('close', ()=>{
        console.log("web scoket connection closed")
    })

    return ws

}