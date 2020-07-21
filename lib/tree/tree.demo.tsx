import Demo from '../../demo';
import React from 'react';
import TreeExample from './tree.example';

const x = require('!!raw-loader!./tree.example');

const TreeDemo = () => {
  return (
    <Demo code={x.default}>
      <TreeExample/>
      </Demo>
  );
};

export default TreeDemo;
