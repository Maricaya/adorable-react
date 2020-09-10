import React, {HTMLAttributes, useState} from 'react'
import './codebox.scss';
import {classes} from '../../../lib/helpers/classes'
import {Icon, Unfold} from '../../../lib'

type CodeBoxProps = {
  title: string,
  description: string
} & HTMLAttributes<HTMLDivElement>

const CodeBox:React.FC<CodeBoxProps> = (props) => {
  const {title, description, children} = props
  const [codeVisible, setCodeVisible] = useState<boolean>(false)
  const toggleVisible = () => {
    setCodeVisible(!codeVisible)
  }
  return (
    <div className="code-example-box">
      <div className="code-title">{title}</div>
      <div className={classes('code-description',
        codeVisible ? 'code-visible': ''
        )}>
        {description}
        <span className="icon-wrapper" onClick={toggleVisible}>
          <Icon name="codepen"/>
        </span>
      </div>
      <Unfold vertical={true} visible={codeVisible} className="code-example">
        {children && children}
      </Unfold>
    </div>
  );
};

export default CodeBox;
