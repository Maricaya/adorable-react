import * as React from 'react';
import './importIcons';

type IconProps = {
    name: string
}

const Icon: React.FunctionComponent<IconProps> = (prop) => {
    return (
    <span>
        <svg>
            <use xlinkHref={`#${prop.name}`}/>
        </svg>
    </span>);
};
export default Icon;

