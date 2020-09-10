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
  enableOpenKeys: Dispatch<SetStateAction<any>>
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
  const { mode, defaultSelectedKey, defaultOpenKeys } = props;
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey || '');

  const [openKeys, enableOpenKeys] = useState<Key[]>(defaultOpenKeys || []);

  // const openKeys = useRef<Key[]>(defaultOpenKeys || []);
  // const enableOpenKey = (key: Key, enabled: boolean) => {
  //   if (enabled) {
  //     if (openKeys.current.indexOf(key) === -1) {
  //       openKeys.current.push(key)
  //     }
  //   }
  //   else {
  //     openKeys.current = openKeys.current.filter((i) => i != key)
  //   }
  //   console.log('key', key)
  //   console.log('openKeys', openKeys.current)
  // }

  return (
    <MenuContext.Provider value={
      {mode: mode!, selectedKey, setSelectedKey, openKeys, enableOpenKeys}
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
