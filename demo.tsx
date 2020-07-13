import * as React from 'react';
import Heiglight, {defaultProps} from 'prism-react-renderer';
import {Button} from './lib';
import {useState} from 'react';

type Props = {
  code: string;
}
const Demo: React.FunctionComponent<Props> = (props) => {
  const [codeVisible, setCodeVisible] = useState(false);

  const code = <Heiglight {...defaultProps} code={props.code} language="jsx">
    {({className, style, tokens, getLineProps, getTokenProps}) => (
      <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({line, key: i})}>
                {line.map((token, key) => (
                  <span {...getTokenProps({token, key})}/>
                ))}
              </div>
            ))}
          </pre>
    )}
  </Heiglight>;
  return (
    <div>
      {props.children}
      <div className="example">
        <Button onClick={() => setCodeVisible(!codeVisible)}>查看代码</Button>
      </div>
      {codeVisible && code}
    </div>
  );
};

export default Demo;
