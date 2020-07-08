import * as React from 'react';

type IconProps = {
    name: string
}

const Icon: React.FunctionComponent<IconProps> = (prop) => {
    return (<>
        {prop.name}
        <span>icon</span>
    </>)
};
export default Icon;

