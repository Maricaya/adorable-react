import * as React from 'react';
import './scroll.scss';
import {HTMLAttributes} from 'react';

type Props = {

} & HTMLAttributes<HTMLDivElement>

const scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <div className="xue-scroll" {...rest}>
      <div className="xue-scroll-inner">
        {children}
      </div>
    </div>
  );
};

export default scroll;
