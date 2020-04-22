const express = require('express')
const app = express()
const io = require('socket.io')

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html')
})

app.listen(3000, () => {
    console.log('listening on :3000')
})