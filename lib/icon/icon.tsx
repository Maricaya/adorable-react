import * as React from 'react';
import './importIcons.ts';
import './icon.scss';
import {classes} from '../helpers/classes';


type IconProps = {
  name: string;
  size?: number;
} & React.SVGAttributes<SVGElement>

const Icon: React.FunctionComponent<IconProps> = ({className, name, size, ...restProps}) => {
  return (<>
    <svg className={classes(`xue-icon`, className)} fontSize={size} {...restProps}>
      <use xlinkHref={`#${name}`}/>
    </svg>
  </>);
};
export default Icon;

