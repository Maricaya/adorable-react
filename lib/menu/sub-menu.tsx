import * as React from 'react';
import {Key, MenuContext} from './menu'
import {classes, scopedClassMaker} from '../helpers/classes'
import {Children, HTMLAttributes, ReactElement, ReactEventHandler, useContext, useRef} from 'react'
import Icon from '../icon/icon'
import {MenuItemProps} from './menu-item'

type MenuSubProps = {
  value: Key,
  expandKeys: Array<Key>,
  title: string,
  itemGroup?: boolean,
  showArrow?: boolean,
} & HTMLAttributes<HTMLLIElement>

const scopedClass = scopedClassMaker('xue-submenu');
const sc = scopedClass;

const SubMenu: React.FC<MenuSubProps> = (props) => {
  const { value, expandKeys, itemGroup, title, showArrow, children } = props
  const { mode, selectedKey } = useContext(MenuContext);

  const childrenKeys = useRef<Array<Key>>([]);
  Children.map(children, (child: ReactElement<MenuItemProps>, index: number) => {
    const uniqueKey = child.props.value || `item-${index}`;
    childrenKeys.current.push(uniqueKey);
  })

  const onClick: ReactEventHandler = (e) => {
    if (!itemGroup) {
      // handleExpankes
    }
  }

  return (
    <li className={
      classes(
        sc(''),
        expandKeys.indexOf(value) > -1 ? 'active': '',
        itemGroup ? 'itemGroup' : ''
      )
    }>
      <div className={classes(sc('title'), mode,
        expandKeys!.indexOf(value) > -1 ? 'active': '',
        childrenKeys.current.indexOf(selectedKey as string) > -1 ? 'child-selected' : ''
      )} onClick={onClick}>
        {title}
        {showArrow && (
          <span className={classes(sc('title-icon-wrapper'))}>
            <Icon name="arrow"/>
          </span>
        )}
      </div>
      <ul className={classes(sc('children-wrapper'))}>
        {props.children}
      </ul>
    </li>
  );
};

SubMenu.defaultProps = {
  itemGroup: false,
  showArrow: true
}

export default SubMenu;
