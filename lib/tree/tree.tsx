import * as React from 'react';
import {scopedClassMaker} from '../helpers/classes';
import './tree.scss';
import {ChangeEventHandler} from 'react';

export type SourceDataItem = {
  text: string,
  value: string,
  children?: SourceDataItem[]
}

type Props = {
    sourceData: SourceDataItem[],
  } & ({
    selected: string[], multiple: true,
    onChange: (newSelected: string[]) => void
  } | {
  selected: string, multiple: false,
  onChange: (newSelected: string) => void
})

const scopedClass = scopedClassMaker('xue-tree');
const sc = scopedClass;

const Tree: React.FC<Props> = (props) => {
  const renderItem = (
    item: SourceDataItem,
    level = 1) => {
    const classes = {
      ['level-' + level]: true,
      'item': true
    };
    const checked = props.multiple ? props.selected.indexOf(item.value) >= 0 : props.selected === item.value;
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const checked = e.target.checked;
      if (props.multiple) {
        if (checked) {
          props.onChange([...props.selected, item.value]);
        } else {
          props.onChange(props.selected.filter(value => value !== item.value));
        }
      } else {
        props.onChange(item.value)
      }
    };
    return <div key={item.value}
                className={sc(classes)}>
      <div className={sc('text')}>
        <input type="checkbox"
               onChange={onChange}
               checked={checked}/>
        {item.text}
      </div>
      {item.children?.map(sub => renderItem(sub, level + 1))}
    </div>;
  };

  return (
    <div>
      {props.sourceData?.map(item => {
        return renderItem(item);
      })}
    </div>
  );
};

export default Tree;
