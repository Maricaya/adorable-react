import * as React from 'react';
import Highlight, {defaultProps} from 'prism-react-renderer';
import './demo.scss';
import theme from 'prism-react-renderer/themes/vsDark';
import {CodeBox} from '../index'

type Props = {
  code: string;
}
const Demo: React.FunctionComponent<Props> = (props) => {
  const code = <Highlight {...defaultProps} theme={theme} code={props.code} language="jsx">
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
  </Highlight>;
  return (
    <div>
      <section>
        <h1>Button 按钮</h1>
        <p className="text">点击以开始即时操作。</p>
      </section>
      <section>
        <h2>代码示例</h2>
        <div className="example">
          <div className="container">
            {props.children}
          </div>
          <CodeBox
            title="按钮类型"
            description="按钮有四种类型：默认按钮、主要按钮、虚线按钮和危险按钮。"
           >
            {code}
          </CodeBox>
        </div>
      </section>
    </div>
  );
};

export default Demo;
