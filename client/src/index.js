import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LandingPage from './LandingPage/LandingPage';
import {CreatePage} from './HostPage/CreatePage';
import {PlayerWaitingPage} from './PlayerPage/PlayerWaitingPage';
import {App} from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <div>
          <Route exact path="/" component={LandingPage} />
          <Route path="/App" component={App} />
          <Route path="/Create" component={CreatePage} />
          <Route path="/Join" component={PlayerWaitingPage} />
        </div>
      </Router>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
