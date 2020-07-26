import Demo from '../../demo';
import React from 'react';
import ScrollExample from './scroll.example';

const x = require('!!raw-loader!./scroll.example');

const ScrollDemo = () => {
  return (
    <Demo code={x.default}>
      <ScrollExample/>
    </Demo>
  );
};

export default ScrollDemo;
