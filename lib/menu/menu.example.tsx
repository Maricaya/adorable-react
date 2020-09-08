import * as React from 'react';
import Menu from './menu'
import MenuItem from './menu-item'
import SubMenu from './sub-menu'

const MenuExample: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>example 1</h1>
        <Menu
          defaultSelectedKey={'item1'}
        >
          <MenuItem value="item1">Option 1</MenuItem>
          <MenuItem value="item2">Option 2</MenuItem>
          <SubMenu value="sub" title="SubMenu" expandKeys={['item4']}>
            <MenuItem value="item4">Option 4</MenuItem>
            <MenuItem value="item5">Option 5</MenuItem>
            <MenuItem value="item6">Option 6</MenuItem>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
};
export default MenuExample;
