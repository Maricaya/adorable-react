import * as React from 'react';
import {Key, MenuContext} from './menu'
import {classes, scopedClassMaker} from '../helpers/classes'
import {Children, HTMLAttributes, ReactElement, ReactEventHandler, useContext, useRef} from 'react'
import Icon from '../icon/icon'
import {MenuItemProps} from './menu-item'
import {Unfold} from '../index'

type MenuSubProps = {
  value: Key,
  title: string,
  itemGroup?: boolean,
  showArrow?: boolean,
} & HTMLAttributes<HTMLLIElement>

const scopedClass = scopedClassMaker('xue-submenu');
const sc = scopedClass;

const SubMenu: React.FC<MenuSubProps> = (props) => {
  const { value, itemGroup, title, showArrow, children } = props
  const { mode, selectedKey, openKeys, enableOpenKeys } = useContext(MenuContext);

  const childrenKeys = useRef<Array<Key>>([]);
  Children.map(children, (child: ReactElement<MenuItemProps>, index: number) => {
    const uniqueKey = child.props.value;
    childrenKeys.current!.push(uniqueKey);
  })
  const onClick: ReactEventHandler = (e) => {
    if (openKeys.indexOf(value) === -1) {
      enableOpenKeys(openKeys.concat([value]))
    }
    else {
      enableOpenKeys(openKeys.filter((i) => i != value))
    }
  }

  return (
    <li className={
      classes(
        sc(''),
        openKeys.indexOf(value) > -1 ? 'active': '',
        itemGroup ? 'itemGroup' : ''
      )
    }>
      <div className={classes(sc('title'), mode,
        openKeys.indexOf(value) > -1 ? 'active': '',
        childrenKeys.current!.indexOf(selectedKey as string) > -1 ? 'child-selected' : ''
      )} onClick={onClick}>
        {title}
        {showArrow && (
          <span className={classes(sc('title-icon-wrapper'))}>
            <Icon name="arrow"/>
          </span>
        )}
      </div>
      <Unfold
        vertical={true}
        visible={openKeys.indexOf(value) > -1 || itemGroup!}
      >
        <ul className={classes(sc('children-wrapper'))}>
          {props.children}
        </ul>
      </Unfold>
    </li>
  );
};

SubMenu.defaultProps = {
  itemGroup: false,
  showArrow: true
}

export default SubMenu;
