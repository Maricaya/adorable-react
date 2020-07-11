import * as React from 'react';
import {scopedClassMaker} from '../class';
const sc = scopedClassMaker('xue-layout');

type Props = {
} & React.HTMLAttributes<HTMLElement>

const Header: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props;

  return (
    <div className={sc('header', {extra: className})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Header;
