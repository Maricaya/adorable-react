import * as React from 'react';
import {Tree} from '../index';
import {useState} from 'react';

const TreeExample2: React.FC = () => {
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
  const [selectedValues, setSelectedValues] = useState<string[]>(['2.1']);
  return (
    <div>
      Tree
      <h1>example 多选</h1>
      展示数据 {selectedValues.join(',  ')}
      <div style={{width: 200}}>
        <Tree sourceData={array}
              selected={selectedValues}
              onChange={(selected) => setSelectedValues(selected)}
              multiple={true}
        />
      </div>
    </div>
  );
};

export default TreeExample2;
