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

const scopedClass = scopedClassMaker('xue-sub-menu');
const sc = scopedClass;

const SubMenu: React.FC<MenuSubProps> = (props) => {
  const { value, itemGroup, title, showArrow, children } = props
  const { mode, openKeys, enableOpenKeys } = useContext(MenuContext);

  const childrenKeys = useRef<Array<Key>>([]);
  Children.map(children, (child: ReactElement<MenuItemProps>) => {
    const uniqueKey = child.props.value;
    childrenKeys.current!.push(uniqueKey);
  })
  const onClick: ReactEventHandler = () => {
    enableOpenKeys(value, openKeys.indexOf(value) === -1)
  }

  return (
    <li className={
      classes(
        sc(''),
        mode,
        openKeys.indexOf(value) > -1 ? 'active': '',
        itemGroup ? 'itemGroup' : ''
      )
    }>
      <div className={classes(sc('title'),
        openKeys.indexOf(value) > -1 ? 'active': ''
      )} onClick={onClick}>
        <div className={'sub-title'}>{title}
          {showArrow && (
            <span className={classes(sc('title-icon-wrapper'))}>
            <Icon name="arrow"/>
          </span>
          )}
        </div>
      </div>
      <Unfold
        vertical={true}
        visible={openKeys.indexOf(value) > -1 || itemGroup!}
      >
        <ul className={classes(sc('list'))}>
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
