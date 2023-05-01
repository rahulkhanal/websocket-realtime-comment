const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static('public'))

const server = app.listen(PORT, () => {
    console.log("Connected in port.................")
})

app.get("/", (req, resp) => {
    resp.sendFile(__dirname + '/index.html')
})
let io = require('socket.io')(server)
io.on('connection', (socket) => {
    console.log(`socket connected in ${socket.id}`);
    socket.on('comment', (data)=>{
        // console.log(data);
        data.time = Date()
        socket.broadcast.emit('comment2', data)
    })

    socket.on('typing', (data)=>{
        // console.log(data);
        socket.broadcast.emit('alert', data.username)
    })
})

