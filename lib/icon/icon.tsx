import * as React from 'react';
import './importIcons';
import './icon.scss';
import classes from '../helpers/classes';

type IconProps = {
  name: string;
} & React.SVGAttributes<SVGElement>

const Icon: React.FunctionComponent<IconProps> = ({className, name, ...restProps}) => {
  return (<span>
        <svg className={classes(`xue-icon`, className)} {...restProps}>
            <use xlinkHref={`#${name}`}/>
        </svg>
    </span>);
};
export default Icon;

