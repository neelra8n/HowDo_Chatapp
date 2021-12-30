const { Socket } = require('engine.io');
const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
})


app.use(express.static(__dirname+'/public'));

app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//Socket

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log("connected");

    //sending to all logged in on this server
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg);
    })
})
