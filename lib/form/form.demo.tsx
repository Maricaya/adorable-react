import Demo from '../../demo';
import React from 'react';
import FormExample from './form.example';

const x = require('!!raw-loader!./form.example');

const FormDemo = () => {
  return (
    <Demo code={x.default}>
      <FormExample/>
    </Demo>
  );
};

export default FormDemo;
