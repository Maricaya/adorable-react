import * as React from 'react';

type SourceDataItem = {
  text: string, value: string | number, children?: SourceDataItem[]
}

type Props = {
  sourceData: SourceDataItem[]
}
const Tree: React.FC<Props> = (props) => {
  return (
    <div>
      {props.sourceData.map(item => {
        return <div>
          {item.text}
          {item.children && item.children.map(item2 => {
            return <div>{item2.text}</div>;})
          }
        </div>;
      })}
    </div>
  );
};

export default Tree;
