import Demo from '../../demo';
import React from 'react';
import MenuExample from './menu.example'

const x = require('!!raw-loader!./menu.example');

const MenuDemo = () => {
  return (
    <Demo code={x.default}>
      <MenuExample/>
    </Demo>
  );
};

export default MenuDemo;
