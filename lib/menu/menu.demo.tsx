import Demo from '../../demo'
import React from 'react'
import MenuExample from './menu.example'
import MenuExample2 from './menu.example2'

const x = require('!!raw-loader!./menu.example')
const y = require('!!raw-loader!./menu.example2')

const MenuDemo = () => {
  return (
    <>
      <Demo code={x.default}>
        <MenuExample/>
      </Demo>
      <Demo code={y.default}>
        <MenuExample2/>
      </Demo>
    </>
  )
}
export default MenuDemo
