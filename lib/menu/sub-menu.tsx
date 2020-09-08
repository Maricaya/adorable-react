import * as React from 'react';
import {Key, MenuContext} from './menu'
import {classes, scopedClassMaker} from '../helpers/classes'
import {useContext, useRef} from 'react'
import Icon from '../icon/icon'
import {MenuItemProps} from './menu-item'

type MenuSubProps = {
  value: Key,
  expandKeys: Array<Key>,
  title: string,
  itemGroup?: boolean,
  showArrow?: boolean,
} & React.HTMLAttributes<HTMLLIElement>

const scopedClass = scopedClassMaker('xue-submenu');
const sc = scopedClass;

const SubMenu: React.FC<MenuSubProps> = (props) => {
  const { value, expandKeys, itemGroup, title, showArrow } = props
  const { mode, selectedKey, setSelectedKey } = useContext(MenuContext);
  const childrenKeys = ['']
  // const childrenKeys = useRef<Array<Key>>(
  //   React.Children.map(chlidren, () => {
    // })
    //   .filter(item => {
    //     console.log(item)
    //       return true
    //   })
    //   .map((item, index) => item.props.value || `item-${index}`)
  // );
  // console.log(, childrenKeys.current)
  const onClick: React.ReactEventHandler = (e) => {
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
       childrenKeys!.current.indexOf(selectedKey) > -1 ? 'child-selected' : ''
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
