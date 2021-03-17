import React from 'react';
import './CreatePage.css';
import '../css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:8080";

export class CreatePage extends React.Component{
  state = {
    room: {gameId:'Creating', mySocketId: null},
    players: [],
    score: []
  }
  
  socket;

  componentDidMount(){
    this.configureSocket();
  }

  configureSocket = () => {
    var socket= socketClient(SERVER);
    socket.on('connection', () => {
      this.handleCreateRoom();
      this.handleRoomNumber();
      this.handlePlayerJoin();
    })
    this.socket = socket;
  }

  handleCreateRoom = () => {
    this.socket.emit('hostCreateNewGame', (response) => {});
  }

  handleRoomNumber = () => {
    this.socket.on('newGameCreated', (response) => {
      this.setState({room: response})
    });
  }

  handlePlayerJoin = () => {
    this.socket.on('playerJoinedRoom', (response) => {
      console.log(response);
      if(this.state.players.length>0 && this.state.players[0].mySocketId == response.mySocketId){
        this.setState({players:[response]});
      }
      else{
        this.setState(prevState =>
          (
            {players:[...prevState.players, response]}
          )
        )
      }
    });
  }

  render(){
    return (
      <div className="ContentBox">
          <h4 className="create-title">
              Rock Paper Scissor
          </h4>
          <hr/>
          <p>Go to other computer/windows and run</p>
          <p>http://{window.location.hostname}/Join</p>
          <p>fill in the code</p>
          <p className="room-code">{this.state.room.gameId}</p>
      </div>
    );
  }
}
