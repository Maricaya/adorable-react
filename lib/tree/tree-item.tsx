import * as React from 'react';
import {ChangeEventHandler, useRef} from 'react';
import {scopedClassMaker} from '../helpers/classes';
import {useUpdate} from '../hooks/useUpdate';
import useToggle from '../hooks/useToggle';

type Props = {
  item: SourceDataItem,
  level: number,
  treeProps: TreeProps,
  onItemChange: (values: string[]) => void
}

type RecursiveArray<K> = Array<K | RecursiveArray<K>>
// 包含字符串的数组,或者 包含了字符串的数组的数组
// interface RecursiveArray<T> extends Array<T |RecursiveArray<T>>{}

const scopedClass = scopedClassMaker('xue-tree');
const sc = scopedClass;

const TreeItem: React.FC<Props> = (props) => {
    const {item, level, treeProps} = props;
    const classes = {
      ['level-' + level]: true,
      'item': true
    };
    const checked = treeProps.multiple ? treeProps.selected.indexOf(item.value) >= 0 : treeProps.selected === item.value;

    const {expand, collapse, value: expanded} = useToggle(true);

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useUpdate(expanded, () => {
      if (!divRef.current) return;
      if (expanded) {
        divRef.current.style.position = 'absolute';
        divRef.current.style.opacity = '0';
        divRef.current.style.height = 'auto';
        const {height} = divRef.current.getBoundingClientRect();
        divRef.current.style.position = '';
        divRef.current.style.opacity = '';
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
    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      const childrenValues = collectChildrenValues(item);
      const checked = e.target.checked;
      if (treeProps.multiple) {
        if (checked) {
          props.onItemChange([...treeProps.selected, item.value, ...childrenValues]);
        } else {
          props.onItemChange(treeProps.selected.filter((value: string) =>
            value !== item.value && childrenValues.indexOf(value) === -1));
        }
      } else {
        if (e.target.value) {
          treeProps.onChange(item.value);
        } else {
          treeProps.onChange('');
        }
      }
    };

    const onItemChange = (values: string[]) => {
        // 子代被选中全部
        const childrenValues = collectChildrenValues(item);
        const common = intersect(values, childrenValues);
        if (common.length !== 0) {
          props.onItemChange(Array.from(new Set(values.concat(item.value))));
          inputRef.current!.indeterminate = common.length !== childrenValues.length;
        } else {
          props.onItemChange(values.filter(v => v !== item.value));
          inputRef.current!.indeterminate = false;
        }
      };

    return (
      <div key={props.item.value}
           className={sc(classes)}>
        <label className={sc('text')}>
          <input ref={inputRef} type="checkbox"
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
            <TreeItem key={sub.value} item={sub} level={level + 1}
                      onItemChange={onItemChange} treeProps={treeProps}/>
          )}
        </div>
      </div>
    );
  }
;
function collectChildrenValues(item: SourceDataItem): string[] {
  return flatten(item.children?.map(i => [i.value, collectChildrenValues(i)]));
}
// 深度优先
function flatten(array?: RecursiveArray<string>): string[] {
  if (!array) return [];
  return array.reduce<string[]>((result, current) =>
      result.concat(typeof current === 'string' ? current : flatten(current))
    , []);
  // const result = [];
  // for (let i=0;i<array.length;i++) {
  //   if(array[i] instanceof Array) {
  //     result.push(...flatten(array[i] as RecursiveArray<string>))
  //   } else {
  //     result.push(array[i] as string)
  //   }
  // }
  // return result;
}
function intersect<T>(array1: T[], array2: T[]): T[] {
  const result: T[] = [];
  for (let i = 0; i < array1.length; i++) {
    if (array2.indexOf(array1[i]) >= 0) {
      result.push(array1[i]);
    }
  }
  return result;
}

export default TreeItem;
