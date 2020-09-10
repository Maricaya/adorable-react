import Demo from '../../site/components/demo/demo';
import React from 'react';
import TreeExample1 from './tree.example1';
import TreeExample2 from './tree.example2';

const x = require('!!raw-loader!./tree.example1');
const y = require('!!raw-loader!./tree.example2');

const TreeDemo = () => {
  return (
    <div>
      <Demo code={x.default}>
        <TreeExample1/>
      </Demo>
      <Demo code={y.default}>
        <TreeExample2/>
      </Demo>
    </div>

  );
};

export default TreeDemo;
