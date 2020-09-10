import * as React from 'react';
import {Menu, MenuItem, SubMenu} from '../index'

const MenuExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>example 1</h1>
        <Menu
          defaultSelectedKey={'item1'}
          defaultOpenKeys={['item4']}
        >
          <MenuItem value="item1">Option 1</MenuItem>
          <MenuItem value="item2">Option 2</MenuItem>
          <SubMenu value="sub1" title="SubMenu">
            <MenuItem value="item4">Option 4</MenuItem>
            <MenuItem value="item5">Option 5</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
};
export default MenuExample;
