import Demo from '../../demo';
import React from 'react';
import UnFoldExample from './unfold.example'

const x = require('!!raw-loader!./unfold.example');

const UnfoldDemo = () => {
  return (
    <Demo code={x.default}>
      <UnFoldExample/>
    </Demo>
  );
};

export default UnfoldDemo;
