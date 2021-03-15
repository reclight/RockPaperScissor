import React from 'react';
import logo from './logo.svg';
import './App.css';
import socketClient from "socket.io-client";

const SERVER = "http://127.0.0.1:8080";

export class App extends React.Component{
  componentDidMount(){
    this.configureSocket();
  }

  configureSocket = () => {
    this.setState({room: "Creating"});
    var socket= socketClient(SERVER);
    socket.on('connection', () => {
      this.handleCreateRoom();
    })
    this.socket = socket;
  }

  handleCreateRoom = () => {
    var thisGameId = ( Math.random() * 100000 ) | 0;
    this.setState({room: thisGameId});
    this.socket.emit('send-message', 'xyz');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
