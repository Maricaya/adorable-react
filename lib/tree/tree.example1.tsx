import * as React from 'react';
import {Tree} from '../index';
import {useState} from 'react';

const TreeExample1: React.FC = () => {
  const [array] = useState([
    {
      text: '1',
      value: '1',
      children: [
        {text: '1.1', value: '1.1', children: [
            {text: '1.1.1', value: '1.1.1'}
          ]},
        {text: '1.2', value: '1.2'}
      ]
    },
    {
      text: '2',
      value: '2',
      children: [
        {text: '2.1', value: '2.1'},
        {text: '2.2', value: '2.2'}
      ]
    }
  ]);
  // const [selectedValues, setSelectedValues] = useState(['2.1']);
  const [selectedValue, setSelectedValue] = useState('1');
  return (
    <div>
      Tree
      <h1>example 单选</h1>
      <div style={{width: 200}}>
        <Tree sourceData={array}
              selected={selectedValue}
              onChange={(selected) => setSelectedValue(selected)}
              multiple={false}
        />
      </div>
    </div>
  );
};

export default TreeExample1;
