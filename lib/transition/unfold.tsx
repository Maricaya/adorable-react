import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {CSSProperties, StyleHTMLAttributes, useCallback, useEffect, useRef} from 'react'

type TransitionEffect = {
  vertical: string,
  horizontal: string
}

type UnfoldProps = {
  visible: boolean,
  transitionTime?: number,
  vertical?: boolean
}

type LeaveTo = {
  vertical: CSSProperties,
  horizontal: CSSProperties
}

type PrevSize = {
  width: number | null,
  height: number | null
}

const Unfold: React.FC<UnfoldProps> = (props) => {
  const {visible, transitionTime} = props
  const transitionEffect = useRef<TransitionEffect>({
    vertical: '',
    horizontal: ''
  })
  const leaveTo = useRef<LeaveTo>({
    vertical: {
      paddingTop: '0',
      paddingBottom: '0',
      borderTopWidth: '0',
      borderBottomWidth: '0',
      height: '0'
    },
    horizontal: {
      paddingLeft: '0',
      paddingRight: '0',
      borderLeftWidth: '0',
      borderRightWidth: '0',
      width: '0'
    }
  })
  const prevCssProp = useRef<CSSProperties | {}>({
    paddingLeft: '',
    paddingRight: '',
    paddingTop: '',
    paddingBottom: '',
    borderTopWidth: '',
    borderBottomWidth: '',
    borderLeftWidth: '',
    borderRightWidth: '',
    width: '',
    height: '',
    overflowX: '',
    overflowY: '',
    overflow: ''
  })
  const prevSize = useRef<PrevSize>({
    width: null,
    height: null
  })
  const node = useRef<HTMLElement>()
  // const addTransitionListener = useCallback(() => {
  //   if (ReactDOM.findDOMNode(this)) {
  //     return;
  //   }
  //   node.current = ReactDOM.findDOMNode(this) as HTMLElement;
    // node.current.addEventListener()
  // })

  useEffect(() => {
    transitionEffect.current = {
      vertical: `
      ${transitionTime}s height cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-top cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-bottom cubic-bezier(.645, .045, .355, 1)`,
      horizontal: `
      ${transitionTime}s width cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-left cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}s padding-right cubic-bezier(.645, .045, .355, 1)`
    }

  }, [])


  return (
    <>
    {
      visible && <div>
        {props.children}
      </div>
    }
    </>
  );
};

export default Unfold;



