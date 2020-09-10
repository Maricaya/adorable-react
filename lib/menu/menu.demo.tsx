import Demo from '../../site/components/demo/demo'
import React from 'react'
import MenuExample from './menu.example'
import MenuExample2 from './menu.example2'
import MenuExample3 from './menu.example3'

const x = require('!!raw-loader!./menu.example')
const y = require('!!raw-loader!./menu.example2')
const z = require('!!raw-loader!./menu.example3')

const MenuDemo = () => {
  return (
    <>
      <Demo code={x.default}>
        <MenuExample/>
      </Demo>
      <Demo code={y.default}>
        <MenuExample2/>
      </Demo>
      <Demo code={z.default}>
        <MenuExample3/>
      </Demo>
    </>
  )
}
export default MenuDemo
