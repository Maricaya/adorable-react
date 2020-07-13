import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ButtonExample from './lib/button/button.example';
import './example.scss';

const logo = require('./logo.jpg');

ReactDOM.render(
  <Router>
    <div className="site-page">
      <header className="site-header">
        <div className="logo">
          <img src={logo.default} width="48" height="48" alt="logo"/>
          <span>xue ui</span>
        </div>
      </header>
      <div className="site-content">
        <div className="site-aside">
          <h2>组件</h2>
          <ul>
            <li><NavLink to="/button">button 按钮</NavLink></li>
          </ul>
        </div>
        <div className="site-main">
          <Route path="/button" component={ButtonExample}/>
        </div>
      </div>
    </div>
  </Router>
  , document.querySelector('#root'));
