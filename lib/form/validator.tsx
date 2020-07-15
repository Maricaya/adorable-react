import {FormValue} from './form';

type FormRule = {
  key: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validator?: {
    name: string;
    validate: (value: string) => Promise<void>;
  }
}

type FormRules = Array<FormRule>;

export type FormErrors = {
  [K: string]: Array<OneError>
}

function isEmpty(value: any) {
  return value === undefined || value === null || value === '';
}

export function noError(errors: any) {
  return Object.keys(errors).length === 0;
}

type OneError = {
  message: string;
  promise?: Promise<any>;
}

const Validator: (formValue: FormValue, rules: FormRules, callback: (errors: any) => void) => void = (formValue, rules, callback) => {
  let errors: FormErrors = {};
  const addError = (key: string, error: OneError) => {
    if (errors[key] === undefined) {
      errors[key] = [];
    }
    errors[key].push(error);
  };

  rules.map(rule => {
    const value = formValue[rule.key];
    if (rule.validator) {
      //  自定义
      const promise = rule.validator.validate(value);
      addError(rule.key, {message: rule.validator.name, promise});
    }
    if (rule.required && isEmpty(value)) {
      addError(rule.key, {message: 'required'});
    }
    if (rule.minLength && !isEmpty(value) && value.length < rule.minLength) {
      addError(rule.key, {message: 'minLength'});
    }
    if (rule.maxLength && !isEmpty(value) && value.length > rule.maxLength) {
      addError(rule.key, {message: 'maxLength'});
    }
    if (rule.pattern) {
      if (!rule.pattern.test(value)) {
        addError(rule.key, {message: 'pattern'});
      }
    }
  });

  Promise.all(
    flat(Object.values(errors))
      .filter(item => item.promise)
      .map(item => item.promise)
  )
    .finally(() => {
      callback(fromEntries(
        Object.keys(errors)
          .map(key =>
            [key, errors[key].map(item => item.message)]
          )));
    });
  return errors;
};

export default Validator;

function flat(array: Array<any>) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      result.push(...array[i]);
    } else {
      result.push(array[i]);
    }
  }
  return result;
}

function fromEntries(array: Array<[string, string[]]>) {
  const result: { [key: string]: string[] } = {};
  for (let i = 0; i < array.length; i++) {
    result[array[i][0]] = array[i][1];
  }
  return result;
}
