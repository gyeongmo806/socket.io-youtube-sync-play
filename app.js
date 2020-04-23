var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})
let hostId
io.on('connection', (socket) => {
    if(hostId == undefined){
        hostId = socket.id
        console.log(hostId)
    }
    socket.on('time' ,(data) => {
        console.log(data)
        console.log(hostId, socket.id)
        console.log(socket.id+":"+data.time)
        if(socket.id == hostId){
            socket.broadcast.emit('res', data.time)
            setTimeout(()=>{
                io.emit('play',true)
            },100)
            
        }
    })
    
});

http.listen(3000, () => {
    console.log('listening on :3000')
})

