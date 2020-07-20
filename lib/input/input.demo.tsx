import Demo from '../../demo';
import React from 'react';
import InputExample from './input.example';

const x = require('!!raw-loader!./input.example');

const InputDemo = () => {
  return (
    <Demo code={x.default}>
      <InputExample/>
    </Demo>
  );
};

export default InputDemo;
