import * as React from 'react';
import {classes, scopedClassMaker} from '../helpers/classes'
import './menu.scss';
import {createContext, Dispatch, HTMLAttributes, SetStateAction, useState} from 'react'

type MenuMode = 'vertical' | 'horizontal'
export type Key = string

type MenuProps = {
  mode?: MenuMode,
  defaultSelectedKey?: Key,
  defaultOpenKeys?: Key[],
} & HTMLAttributes<HTMLUListElement>

type Context = {
  mode: MenuMode,
  selectedKey: Key,
  setSelectedKey: Dispatch<SetStateAction<any>>,
  openKeys: Key[],
  enableOpenKeys: (value: string, b: boolean) => void
}

export const MenuContext = createContext<Context>({
  mode: 'horizontal',
  selectedKey: '',
  setSelectedKey: () => '',
  openKeys: [''],
  enableOpenKeys: () => ['']
})

const scopedClass = scopedClassMaker('xue-menu');
const sc = scopedClass;

const Menu: React.FC<MenuProps> = (props) => {
  const { mode, defaultSelectedKey, defaultOpenKeys, ...rest } = props;
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey || '');

  const [openKeys, setOpenKeys] = useState<Key[]>(defaultOpenKeys || []);

  const enableOpenKeys = (key: Key, enabled: boolean) => {
    if (enabled) {
      if (openKeys.indexOf(key) === -1) {
        setOpenKeys(openKeys.concat([key]))
      }
    }
    else {
      setOpenKeys(openKeys.filter((i) => i != key))
    }
  }

  return (
    <MenuContext.Provider value={
      {mode: mode!, selectedKey, setSelectedKey, openKeys, enableOpenKeys}
    }>
      <ul className={classes(sc(''), mode)} {...rest}>
        {props.children}
      </ul>
    </MenuContext.Provider>
  );
};

Menu.defaultProps = {
  mode: 'horizontal'
};

export default Menu;
