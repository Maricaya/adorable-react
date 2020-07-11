import * as React from 'react';
import './button.scss';

type Props = {
  name?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FunctionComponent<Props> = (props) => {
  const {children, ...restProps} = props;
  return (
    <button {...restProps}>
      {children}
    </button>
  );
};

export default Button;
