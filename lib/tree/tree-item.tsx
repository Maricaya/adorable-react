import * as React from 'react';
import {ChangeEventHandler, useRef} from 'react';
import {useState} from 'react';
import {scopedClassMaker} from '../helpers/classes';
import {useUpdate} from '../hooks/useUpdate';

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

    const divRef = useRef<HTMLDivElement>(null);

    useUpdate(expanded, () => {
      if (!divRef.current) return;
      if (expanded) {
        divRef.current.style.height = 'auto';
        const {height} = divRef.current.getBoundingClientRect();
        divRef.current.style.height = '0px';
        divRef.current.getBoundingClientRect();
        divRef.current.style.height = height + 'px';
        const afterExpand = () => {
          if (!divRef.current) return;
          divRef.current.style.height = '';
          divRef.current.classList.add('xue-tree-children-present');
          divRef.current.removeEventListener('transitionend', afterExpand);
        };
        divRef.current.addEventListener('transitionend', afterExpand);
      } else {
        const {height} = divRef.current.getBoundingClientRect();
        divRef.current.style.height = height + 'px';
        divRef.current.getBoundingClientRect();
        divRef.current.style.height = '0px';
        const afterCollapse = () => {
          if (!divRef.current) return;
          divRef.current.style.height = '';
          divRef.current.classList.add('xue-tree-children-gone');
          divRef.current.removeEventListener('transitionend', afterCollapse);
        };
        divRef.current.addEventListener('transitionend', afterCollapse);
      }
    });

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
        <div ref={divRef} className={sc({children: true, collapsed: !expanded})}>
          {item.children?.map(sub =>
            <TreeItem key={sub.value} item={sub} level={level + 1} treeProps={treeProps}/>
          )}
        </div>
      </div>
    );
  }
;

export default TreeItem;
