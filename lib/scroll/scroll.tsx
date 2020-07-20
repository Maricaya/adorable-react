import * as React from 'react';
import './scroll.scss';
import {HTMLAttributes} from 'react';
import {scrollbarWidth} from './scrollbar-width';

type Props = {

} & HTMLAttributes<HTMLDivElement>

const scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  return (
    <div className="xue-scroll" {...rest}>
      <div className="xue-scroll-inner" style={{right: -scrollbarWidth()}}>
        {children}
      </div>
    </div>
  );
};

export default scroll;
