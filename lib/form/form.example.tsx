import * as React from 'react';
import Form, {FormValue} from './form';
import {Fragment, useState} from 'react';
import Validator, {noError} from './validator';
import {Button} from '../index';

const FormExample: React.FunctionComponent = () => {
  const [formData, setFormData] = useState<FormValue>({
    username: 'xlchu',
    password: ''
  });
  const [fields] = useState([
    {name: 'username', label: '用户名', input: {type: 'text'}},
    {name: 'password', label: '密码', input: {type: 'password'}},
  ]);
  const [errors, setErrors] = useState({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    const rules = [
      {key: 'username', required: true},
      {key: 'username', minLength: 8, maxLength: 16},
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true}
    ];
    const errors = Validator(formData, rules);
    if (noError(errors)) {
    //  没有错
    }
    setErrors(errors);
  };


  return (
    <Form value={formData} fields={fields}
          buttons={
            <Fragment>
              <Button type="submit" level="important">提交</Button>
              <Button>返回</Button>
            </Fragment>
          }
          onChange={(newValue) => setFormData(newValue)}
          onSubmit={onSubmit}
          errors={errors}/>
  );
};
export default FormExample;
