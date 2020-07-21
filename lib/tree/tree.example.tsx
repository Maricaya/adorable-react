import * as React from 'react';
import {Tree} from '../index';
import {useState} from 'react';

const TreeExample: React.FC = () => {
  const [array] = useState([
    {
      text: '一',
      value: 1,
      children: [
        {text: '一只一', value: '1.1'},
        {text: '一只二', value: '1.2'}
      ]
    },
    {
      text: '二',
      value: 2,
      children: [
        {text: '二只一', value: '2.1'},
        {text: '二只二', value: '2.2'}
      ]
    }
  ]);
  return (
    <div>
      Tree
      <h1>展示数据</h1>
      <Tree sourceData={array}/>
    </div>
  );
};

export default TreeExample;
