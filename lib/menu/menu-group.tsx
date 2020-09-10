import * as React from 'react';
import {scopedClassMaker} from '../helpers/classes'

export type MenuGroupProps = {
  title: string
} & React.HTMLAttributes<HTMLLIElement>

const scopedClass = scopedClassMaker('xue-menu-group');
const sc = scopedClass;

const MenuGroup: React.FC<MenuGroupProps> = (props) => {

  return (
    <li className={sc('')}>
      <div className={sc('title')}>
        {props.title}
      </div>
      <ul className={sc('list')}>
        {props.children}
      </ul>
    </li>
  );
};

export default MenuGroup;
