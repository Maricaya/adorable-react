import * as React from 'react';
import {FormErrors} from './validator';
import Input from '../input/input';
import {classes} from '../helpers/classes';
import './form.scss';

export type FormValue = {
  [K: string]: any
}

type Props = {
  value: FormValue;
  fields: Array<{ name: string, label: string, input: { type: string } }>;
  buttons: React.ReactElement;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  onChange: (value: FormValue) => void;
  errors: FormErrors
}

const Form: React.FunctionComponent<Props> = (props) => {
  const formData = props.value;
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    props.onSubmit(e);
  };
  const onInputChange = (name: string, value: string) => {
    const newFormValue = {...formData, [name]: value};
    props.onChange(newFormValue);
  };
  return (
    <form onSubmit={onSubmit}>
      <table className="xue-form-table">
        {props.fields.map(f => (
          <tr className={classes('xue-form-tr')} key={f.name}>
            <td className="xue-form-td">
              <span className="xue-form-label">
                {f.label}
              </span>
            </td>
            <td className="xue-form-td">
              <Input className="xue-form-input" type={f.input.type} value={formData[f.name]}
                     onChange={(e) => onInputChange(f.name, e.target.value)}/>
            </td>
            <div>{props.errors[f.name]}</div>
          </tr>)
        )}
        <tr className="xue-form-tr">
          <td className="xue-form-td"/>
          <td className="xue-form-td">
            {props.buttons}
          </td>
        </tr>
      </table>
    </form>
  );
};

export default Form;
