import * as React from 'react';
import './importIcons';
import './icon.scss';

type IconProps = {
    name: string;
    onClick: () => void
}

const Icon: React.FunctionComponent<IconProps> = (props) => {
    return (
    <span>
        <svg className="xue-icon" onClick={props.onClick}>
            <use xlinkHref={`#${props.name}`}/>
        </svg>
    </span>);
};
export default Icon;

