import Demo from '../../demo';
import React from 'react';
import IconExample from './icon.example';

const x = require('!!raw-loader!./icon.example')

const IconDemo =() => {
  return (
    <Demo code={x.default}>
      <IconExample/>
    </Demo>
  )
}

export default IconDemo;