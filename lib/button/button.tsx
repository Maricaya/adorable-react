import * as React from 'react';
import './button.scss';

type Props = {
  name?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FunctionComponent<Props> = (props) => {
    return (
        <button>
          {props.children}
        </button>
    )
};

export default Button;
