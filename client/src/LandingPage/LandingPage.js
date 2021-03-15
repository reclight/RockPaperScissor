import React from 'react';
import './LandingPage.css';
import '../css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import socketClient from "socket.io-client";

function LandingPage() {
  return (
    <div className="Landing">
        <p className="landing-title">
            Rock Paper Scissor
        </p>
        <hr/>
        <Link className='btn btn-info landing-button' to='/Create'>Create Room</Link>
        <br/>
        <Link className='btn btn-info landing-button' to='/Join'>Join Room</Link>
        <br/>
        <Link className='btn btn-info landing-button' to='/About'>About</Link>
    </div>
  );
}

export default LandingPage;
