import * as React from 'react';
import {Menu, MenuGroup, MenuItem} from '../index'


const MenuExample3: React.FunctionComponent = () => {
  return (
    <div>
      <div>
        <h1>example 3</h1>
        <Menu
          style={{width: 220}}
          mode="vertical"
          defaultSelectedKey={'item1'}
          defaultOpenKeys={['item4']}
        >
          <MenuGroup title={'title one'}>
            <MenuItem value="item4">Option 4</MenuItem>
            <MenuItem value="item5">Option 5</MenuItem>
          </MenuGroup>
          <MenuGroup title={'title two'}>
            <MenuItem value="item4">Option 4</MenuItem>
            <MenuItem value="item5">Option 5</MenuItem>
          </MenuGroup>
        </Menu>
      </div>
    </div>
  )
};
export default MenuExample3;
