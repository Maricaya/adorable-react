import * as React from 'react';
import './button.scss';
import {classes} from '../helpers/classes';
import {ButtonHTMLAttributes} from 'react'

type Props = {
  level?: 'important' | 'danger' | 'normal'
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FunctionComponent<Props> = (props) => {
  const {children, className, level = 'normal', ...rest} = props;
  return (
    <button className={classes('xue-button', `xue-button-${level}`,className)} {...rest}>
      {children}
    </button>
  );
};

export default Button;
