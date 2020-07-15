import * as React from 'react';
import Form, {FormValue} from './form';
import {Fragment, useState} from 'react';
import Validator, {noError} from './validator';
import {Button} from '../index';

const userNames = ['xlchu', 'jack', 'rose'];
const checkUserName = (username: string, succeed: () => void, fail: () => void) => {
  setTimeout(() => {
    if (userNames.indexOf(username) <= 0) {
      succeed();
    } else {
      fail();
    }
  }, 3000);
};

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
      {
        key: 'username', validator: {
          name: 'unique',
          validate(username: string) {
            return new Promise<void>((resolve, reject) => {
              checkUserName(username, resolve, reject);
            });
          }
        }
      },
      {key: 'username', pattern: /^[A-Za-z0-9]+$/},
      {key: 'password', required: true}
    ];
    Validator(formData, rules, (errors) => {
      setErrors(errors);
      if (noError(errors)) {
        //  没有错
      }
    });

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
