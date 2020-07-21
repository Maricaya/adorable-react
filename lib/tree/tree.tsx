import * as React from 'react';
import {scopedClassMaker} from '../helpers/classes';
import './tree.scss';

export type SourceDataItem = {
  text: string,
  value: string,
  children?: SourceDataItem[]
}

type Props = {
  sourceData: SourceDataItem[],
  selected: string[],
  onChange: (item: SourceDataItem, bool: boolean) => void,
}

const scopedClass = scopedClassMaker('xue-tree');
const sc = scopedClass;


const renderItem = (
  item: SourceDataItem,
  selected: string[],
  onChange: (item: SourceDataItem, bool: boolean) => void,
  level = 1) => {
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  return <div key={item.value}
              className={sc(classes)}
  >
    <div className={sc('text')}>
      <input type="checkbox"
             onChange={(e) => onChange(item, e.target.checked)}
             checked={selected.indexOf(item.value) >= 0}/>
      {item.text}
    </div>
    {item.children?.map(sub => {
      return renderItem(sub, selected, onChange,level + 1);
    })}
  </div>;
};

const Tree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item => {
        return renderItem(item, props.selected, props.onChange);
      })}
    </div>
  );
};

export default Tree;
