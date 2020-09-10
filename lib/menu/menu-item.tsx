import * as React from 'react';
import {classes, scopedClassMaker} from '../helpers/classes'
import {useContext} from 'react'
import {Key, MenuContext} from './menu'

export type MenuItemProps = {
  value: Key,
} & React.HTMLAttributes<HTMLLIElement>

const scopedClass = scopedClassMaker('xue-menu-item');
const sc = scopedClass;

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { value } = props;
  const { mode, selectedKey, setSelectedKey } = useContext(MenuContext);
  const onClick = () => {
    setSelectedKey(value);
  }
  return (
    <li className={
      classes(
        sc(''),
        mode,
        value === selectedKey ? 'active': ''
      )
    } onClick={() => onClick()}>
      {props.children}
    </li>
  );
};

export default MenuItem;
