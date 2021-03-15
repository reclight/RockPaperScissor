import React from 'react';
import './PlayerWaitingPage.css';
import '../css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import socketClient from "socket.io-client";
import '../css/bootstrap.min.css';

const SERVER = "http://127.0.0.1:8080";

export class PlayerWaitingPage extends React.Component{
  state = {
    room: null,
    playerName: null,
  }
  
  socket;

  componentDidMount(){
    this.configureSocket();
  }

  configureSocket = () => {
    var socket= socketClient(SERVER);
    socket.on('connection', () => {
    })
    this.socket = socket;
  }

  handleJoinGame = () => {
    // console.log('Player clicked "Start"');

    // collect data to send to the server
    var data = {
        gameId : this.state.room,
        playerName : this.state.playerName
    };

    console.log(data);

    // Send the gameId and playerName to the server
    this.socket.emit('playerJoinGame', data);

    // Set the appropriate properties for the current player.
    App.myRole = 'Player';
    App.Player.myName = data.playerName;
  }

  onRoomChange = (event) => {
    this.setState({room:event.target.value})
  }

  onPlayerNameChange = (event) => {
    this.setState({playerName:event.target.value})
  }

  render(){
    return (
      <div className="ContentBox">
          <h4 className="waiting-title">
              Rock Paper Scissor
          </h4>
          <hr/>
          <p>Insert the room id</p>
          <input id="txtRoomId" type="text" value={this.state.room} onChange={this.onRoomChange} className="room-input"/>
          <input id="txtPlayerName" type="text" value={this.state.playerName} onChange={this.onPlayerNameChange} className="room-input"/>
          <button id="btnJoinGame" class="btn btn-info btn-join" onClick={this.handleJoinGame}>JOIN</button>
      </div>
    );
  }
}
