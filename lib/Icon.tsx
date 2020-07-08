import * as React from 'react';
import './importIcons';
import './icon.scss';

type IconProps = {
    name: string
}

const Icon: React.FunctionComponent<IconProps> = (prop) => {
    return (
    <span>
        <svg className="xue-icon">
            <use xlinkHref={`#${prop.name}`}/>
        </svg>
    </span>);
};
export default Icon;

