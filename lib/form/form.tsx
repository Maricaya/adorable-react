import * as React from 'react';
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
  errors: { [K: string]: string[] };
  errorsDisplayMode?: 'first' | 'all';
  transformError?: (message: string) => string;
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
  const transformError = (message: string) => {
    const map: any = {
      required: '必填',
      minLength: '太短',
      maxLength: '太长'
    };
    return props.transformError && props.transformError(message) || map[message] || '未知错误';
  };
  return (
    <form onSubmit={onSubmit}>
      <table className="xue-form-table">
        <tbody>
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
              <div className="xue-form-error">
                {props.errors[f.name] ?
                  props.errorsDisplayMode === 'first' ?
                    transformError!(props.errors[f.name][0]) :
                    props.errors[f.name].map(error => transformError!(error)).join('，') :
                  <span>&nbsp;</span>}
              </div>
            </td>
          </tr>)
        )}
        <tr className="xue-form-tr">
          <td className="xue-form-td"/>
          <td className="xue-form-td">
            {props.buttons}
          </td>
        </tr>
        </tbody>
      </table>
    </form>
  );
};

Form.defaultProps = {
  errorsDisplayMode: 'all'
};

export default Form;
