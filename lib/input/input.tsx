import * as React from 'react';
import {classes} from '../helpers/classes';
import './input.scss';

type Props = {} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FunctionComponent<Props> = (props) => {
  const {className, ...rest} = props;
  return (
    <input className={classes('xue-input', className)} {...rest}/>
  );
};
export default Input;
