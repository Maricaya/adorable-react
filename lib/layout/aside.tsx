import * as React from 'react';
import {scopedClassMaker} from '../helpers/classes';
const sc = scopedClassMaker('xue-layout');

type Props = {
} & React.HTMLAttributes<HTMLElement>

const Aside: React.FunctionComponent<Props> = (props) => {
  const {className, ...restProps} = props;

  return (
    <div className={sc('aside', {extra: className})} {...restProps}>
      {props.children}
    </div>
  );
};

export default Aside;
