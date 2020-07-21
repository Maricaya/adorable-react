import * as React from 'react';
import {scopedClassMaker} from '../helpers/classes';
import './tree.scss'

type SourceDataItem = {
  text: string, value: string | number, children?: SourceDataItem[]
}

type Props = {
  sourceData: SourceDataItem[]
}

const scopedClass = scopedClassMaker('xue-tree');
const sc = scopedClass;


const renderItem = (item: SourceDataItem, level = 1) => {
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  return <div key={item.value}
              style={{paddingLeft: (level - 1) * 10 + 'px'}}
              className={sc(classes)}
  >
    {item.text}
    {item.children?.map(sub => {
      return renderItem(sub, level + 1);
    })}
  </div>;
};

const Tree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.sourceData?.map(item => {
        return renderItem(item);
      })}
    </div>
  );
};

export default Tree;
