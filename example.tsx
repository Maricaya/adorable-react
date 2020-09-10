import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, NavLink} from 'react-router-dom';
import ButtonExample from './lib/button/button.example';
import DialogExample from './lib/dialog/dialog.example';
import LayoutExample from './lib/layout/layout.example';
import {Aside, Header, Layout, Content, Footer, Menu, MenuItem, MenuGroup} from './lib'
import './site/style/example.scss';
import './site/style/global.scss';
import IconDemo from './lib/icon/icon.demo';
import FormDemo from './lib/form/form.demo';
import InputDemo from './lib/input/input.demo';
import ScrollDemo from './lib/scroll/scroll.demo';
import TreeDemo from './lib/tree/tree.demo';
import CitySelectDemo from './lib/citySelect/citySelect.demo';
import MenuDemo from './lib/menu/menu.demo'
import UnfoldDemo from './lib/transition/unfold.demo'
import SiteHeader from './site/components/SiteHeader/siteHeader'

// const logo = require('./logo.jpg');
// 只有require支持自定义加载,!! 表示开启自定义加载
// const x = require('!!raw-loader!./lib/icon/icon.example');

// void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
  <Router>
    <Layout className="site-page">
      <Header className="site-header">
        <SiteHeader/>
      </Header>
      <Layout>
        <Aside className="site-aside">
          <Menu
            style={{width: 275}}
            mode="vertical"
          >
            <MenuGroup title='通用'>
              <MenuItem value="button"><NavLink to="/button">Button 按钮</NavLink></MenuItem>
              <MenuItem value="icon"><NavLink to="/icon">Icon 图标</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='布局'>
              <MenuItem value="layout"><NavLink to="/layout">Layout 布局</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='导航'>
              <MenuItem value="menu"><NavLink to="/menu">menu 菜单栏</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='数据录入'>
              <MenuItem value="input"><NavLink to="/input">Input 输入框</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='数据展示'>
              <MenuItem value="input"><NavLink to="/input">Input 输入框</NavLink></MenuItem>
              <MenuItem value="form"><NavLink to="/form">Form 表单</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='信息反馈'>
              <MenuItem value="dialog"><NavLink to="/dialog">Dialog 对话框</NavLink></MenuItem>
            </MenuGroup>
            <MenuGroup title='其他'>
              <MenuItem value="scroll"><NavLink to="/scroll">Scroll 滚动条</NavLink></MenuItem>
              <MenuItem value="tree"><NavLink to="/tree">Tree 树形控件</NavLink></MenuItem>
              <MenuItem value="citySelect"><NavLink to="/citySelect">CitySelect 城市选择</NavLink></MenuItem>
              <MenuItem value="unfold"><NavLink to="/unfold">unfold transition</NavLink></MenuItem>
            </MenuGroup>
          </Menu>
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
          <Route path="/citySelect" component={CitySelectDemo}/>
          <Route path="/menu" component={MenuDemo}/>
          <Route path="/unfold" component={UnfoldDemo}/>
        </Content>
      </Layout>
      <Footer className="site-footer">
        &copy; Marcia
      </Footer>
    </Layout>
  </Router>
  , document.querySelector('#root'));
