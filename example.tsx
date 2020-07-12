import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import {Aside, Header, Layout, Content, Footer} from './lib';
import './example.scss';

const logo = require('./logo.jpg');

// void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo} width="48" height="48" alt="logo"/>
          <span>xue ui</span>
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li><NavLink to="/icon">icon 图标</NavLink></li>
            <li><NavLink to="/button">button 按钮</NavLink></li>
            <li><NavLink to="/dialog">dialog 对话框</NavLink></li>
            <li><NavLink to="/layout">layout 布局</NavLink></li>
          </ul>
        </Aside>
        <Content className="side-main">
          <Route path="/icon" component={IconExample}/>
          <Route path="/button" component={ButtonExample}/>
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; Marcia
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));
