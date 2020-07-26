import * as React from 'react';
// import Highlight, {defaulProps} from 'prism-react-render';

type Props = {
  code: string;
}
const Demo: React.FunctionComponent<Props> = (props) => {
  return (
    <div>
      {props.children}
      <pre>
        {props.code}
      </pre>
    </div>
  )
}

export default Demo;