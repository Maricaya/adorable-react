import * as React from 'react';
import {classes, scopedClassMaker} from '../helpers/classes'
import './menu.scss';
import {createContext, Dispatch, HTMLAttributes, SetStateAction, useState} from 'react'

type MenuMode = 'vertical' | 'horizontal' | undefined
export type Key = string | number

type MenuProps = {
  mode?: MenuMode,
  defaultSelectedKey?: Key,
  defaultExpandKey?: Key[],
} & HTMLAttributes<HTMLUListElement>

type Context = {
  mode: MenuMode,
  selectedKey: Key,
  setSelectedKey: Dispatch<SetStateAction<any>>
}

export const MenuContext = createContext<Context>({
  mode: 'horizontal',
  selectedKey: '',
  setSelectedKey: () => ''
})

const scopedClass = scopedClassMaker('xue-menu');
const sc = scopedClass;

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultSelectedKey, defaultExpandKey } = props

  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);
  const [expandedKey, setExpandedKey] = useState(defaultExpandKey);

  return (
    <MenuContext.Provider value={
      {
        mode,
        selectedKey, setSelectedKey,
        expandedKey, setExpandedKey
      }
    }>
      <ul className={classes(sc(''), mode)}>
        {props.children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  mode: 'horizontal'
};

export default Menu;
