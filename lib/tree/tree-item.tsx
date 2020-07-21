import * as React from 'react';
import {ChangeEventHandler} from 'react';
import {useState} from 'react';
import {scopedClassMaker} from '../helpers/classes';

type Props = {
  item: SourceDataItem,
  level: number,
  treeProps: TreeProps
}

const scopedClass = scopedClassMaker('xue-tree');
const sc = scopedClass;

const TreeItem: React.FC<Props> = (props) => {
  const {item, level, treeProps} = props;
  const classes = {
    ['level-' + level]: true,
    'item': true
  };
  const checked = treeProps.multiple ? treeProps.selected.indexOf(item.value) >= 0 : treeProps.selected === item.value;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const checked = e.target.checked;
    if (treeProps.multiple) {
      if (checked) {
        treeProps.onChange([...treeProps.selected, item.value]);
      } else {
        treeProps.onChange(treeProps.selected.filter((value: string) => value !== item.value));
      }
    } else {
      if (e.target.value) {
        treeProps.onChange(item.value);
      } else {
        treeProps.onChange('');
      }
    }
  };
  const [expanded, setExpanded] = useState(true);

  const expand = () => {
    setExpanded(true);
  };
  const collapse = () => {
    setExpanded(false);
  };

  return (
    <div key={props.item.value}
         className={sc(classes)}>
      <label className={sc('text')}>
        <input type="checkbox"
               onChange={onChange}
               checked={checked}/>
        {item.text}
        {item.children &&
        <span>
          {expanded ?
            <span onClick={collapse}>-</span> :
            <span onClick={expand}>+</span>}
        </span>}
      </label>
      <div className={sc({children: true, collapsed: !expanded})}>
        {item.children?.map(sub =>
          <TreeItem key={sub.value} item={sub} level={level+1} treeProps={treeProps}/>
        )}
      </div>
    </div>
  );
};

export default TreeItem;
