var io;
var gameSocket;

module.exports.initGame = function(sio, socket){
    console.log('abcadaea');
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });

    //common event
    //gameSocket.on('findLeader',findLeader);

    // Host Events
    gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    //gameSocket.on('hostRoomFull', hostPrepareGame);
    //gameSocket.on('hostCountdownFinished', hostStartGame);
    //gameSocket.on('hostNextRound', hostNextRound);

    // Player Events
    gameSocket.on('playerJoinGame', playerJoinGame);
    //gameSocket.on('playerAnswer', playerAnswer);
    //gameSocket.on('playerRestart', playerRestart);
}

function hostCreateNewGame() {
    var thisGameId = ( Math.random() * 100000 ) | 0;

    console.log("Creating new room with id", thisGameId)
    
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    this.emit('newGameCreated', {gameId: thisGameId, mySocketId: this.id});

    // Join the Room and wait for the players
    this.join(thisGameId.toString());
};

function playerJoinGame(data){
    console.log('Player ' + data.playerName +' has joined room '+data.gameId);
    var sock = this;
    console.log(gameSocket.adapter.rooms.get(data.gameId));
    console.log(gameSocket.adapter.rooms);
    var room = gameSocket.adapter.rooms.get(data.gameId);

    if( room != undefined ){
        console.log("room found");
        // attach the socket id to the data object.
        data.mySocketId = sock.id;
        sock.join(data.gameId);
        io.sockets.in(data.gameId).emit('playerJoinedRoom', data);
    }
    else {
        this.emit('error', {message: "This room does not exist"});
    }
}