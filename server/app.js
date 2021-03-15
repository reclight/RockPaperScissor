const http = require('http');
const express = require('express');
const socketio = require('socket.io');
var cors = require('cors');
var rpsgame = require('./rpsgame');

const app = express();

app.use(cors());

const server = http.createServer(app).listen(process.env.PORT || 8080);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials:true
    }
});

io.on('connection', (socket) =>{
    console.log('new client connected');
    
    socket.emit('connection', null);

    rpsgame.initGame(io, socket);

    socket.on('send-message', message => {
        console.log('a message is sent');
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
    });
})

/**
 * @description This methos retirves the static channels
 */
app.get('/getChannels', (req, res) => {
    res.json({
        channels: STATIC_CHANNELS
    })
});