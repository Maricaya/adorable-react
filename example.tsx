import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import IconExample from './lib/icon/icon.example';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import {Aside, Header, Layout, Content, Footer} from './lib';
import './example.scss';
import IconDemo from './lib/icon/icon.demo';
import FormDemo from './lib/form/form.demo';
import InputDemo from './lib/input/input.demo';
import ScrollDemo from './lib/scroll/scroll.demo';
import TreeDemo from './lib/tree/tree.demo';

const logo = require('./logo.jpg');

// 只有require支持自定义加载,!! 表示开启自定义加载
const x = require('!!raw-loader!./lib/icon/icon.example');
console.log(logo, x, IconExample);
// void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <div className="logo">
          <img src={logo.default} width="48" height="48" alt="logo"/>
          <span>xue ui</span>
        </div>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <h2>组件</h2>
          <ul>
            <li><NavLink to="/icon">Icon 图标</NavLink></li>
            <li><NavLink to="/button">Button 按钮</NavLink></li>
            <li><NavLink to="/input">Input 输入框</NavLink></li>
            <li><NavLink to="/dialog">Dialog 对话框</NavLink></li>
            <li><NavLink to="/layout">Layout 布局</NavLink></li>
            <li><NavLink to="/form">Form 表单</NavLink></li>
            <li><NavLink to="/scroll">Scroll 滚动条</NavLink></li>
            <li><NavLink to="/tree">Tree 树形控件</NavLink></li>
          </ul>
        </Aside>
        <Content className="site-main">
          <Route path="/icon" component={IconDemo}/>
          <Route path="/button" component={ButtonExample}/>
          <Route path="/input" component={InputDemo}/>
          <Route path="/dialog" component={DialogExample}/>
          <Route path="/layout" component={LayoutExample}/>
          <Route path="/form" component={FormDemo}/>
          <Route path="/scroll" component={ScrollDemo}/>
          <Route path="/tree" component={TreeDemo}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; Marcia
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));
