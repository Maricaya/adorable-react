import Demo from '../../site/components/demo/demo';
import React from 'react';
import CitySelectExample from './citySelect.example';

const x = require('!!raw-loader!./citySelect.example');

const CitySelectDemo = () => {
  return (
    <Demo code={x.default}>
      <CitySelectExample/>
    </Demo>
  );
};

export default CitySelectDemo;
