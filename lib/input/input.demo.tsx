import React from 'react';
import InputExample from './input.example';
import {Demo} from '../../site/components'

const x = require('!!raw-loader!./input.example');

const InputDemo = () => {
  return (
    <Demo code={x.default}>
      <InputExample/>
    </Demo>
  );
};

export default InputDemo;
