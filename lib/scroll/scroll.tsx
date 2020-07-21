import * as React from 'react';
import './scroll.scss';
import {HTMLAttributes} from 'react';
import {scrollbarWidth} from './scrollbar-width';
import {UIEventHandler} from 'react';

type Props = {

} & HTMLAttributes<HTMLDivElement>

const scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;

  const onScroll:UIEventHandler = (e) => {
    console.log(e);
  };

  return (
    <div className="xue-scroll" {...rest}>
      <div className="xue-scroll-inner"
           style={{right: -scrollbarWidth()}}
           onScroll={onScroll}>
        {children}
      </div>
    </div>
  );
};

export default scroll;
