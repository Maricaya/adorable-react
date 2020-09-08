import * as React from 'react';
import {classes, scopedClassMaker} from '../helpers/classes'
import './menu.scss';
import {Dispatch, SetStateAction, useState} from 'react'

type MenuMode = 'vertical' | 'horizontal' | undefined
export type Key = string | number

type MenuProps = {
  mode?: MenuMode,
  defaultSelectedKey: Key,
} & React.HTMLAttributes<HTMLUListElement>

type Context = {
  mode: MenuMode,
  selectedKey: Key,
  setSelectedKey: Dispatch<SetStateAction<any>>
}

export const MenuContext = React.createContext<Context>({
  mode: 'horizontal',
  selectedKey: '',
  setSelectedKey: () => ''
})

const scopedClass = scopedClassMaker('xue-menu');
const sc = scopedClass;

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultSelectedKey } = props

  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);

  return (
    <MenuContext.Provider value={
      {
        mode,
        selectedKey, setSelectedKey
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
