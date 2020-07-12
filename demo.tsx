import * as React from 'react';

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