import * as React from 'react';
import {scopedClassMaker} from '../class';
import './layout.scss';
import {ReactElement} from 'react';
import Aside from './aside';

const sc = scopedClassMaker('xue-layout');

type Props = {
  children: ReactElement | Array<ReactElement>
} & React.HTMLAttributes<HTMLElement>

const Layout: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props;
  const children = props.children as Array<ReactElement>;
  // 只要有一个 Aside，结果为 true
  const hasAside = 'length' in children && children.reduce((result, node) => result || node.type === Aside, false);
  return (
    <div className={sc({'': true, hasAside}, {extra: className})} {...restProps}>
      {props.children}
    </div>);
};

export default Layout;
