import * as React from 'react';
import {
  CSSProperties,
  TransitionEventHandler,
  useEffect,
  useRef
} from 'react'

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
  width: string | null,
  height: string | null
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
  const prevCssProp = useRef({
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
  });
  const prevSize = useRef<PrevSize>({
    width: null,
    height: null
  });
  const containerRef = useRef<HTMLDivElement>(null);

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

  const setNodeStyle = (cssProp: object) => {
    Object.keys(cssProp).map((key) => {
      // @ts-ignore
      containerRef.current!.style[key] = cssProp[key]
    })
  }

  const getNodeSize = (node: HTMLDivElement) => {
    const display = node.style.display
    if (display === 'none') {
      node.style.display = ''
    }
    const { top, left, right, bottom } = node.getBoundingClientRect()
    const rectWidth = right - left
    const rectHeight = bottom - top
    const {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width,
      height,
      overflowX,
      overflowY,
      overflow
    } = node.style
    if (display === 'none') {
      node.style.display = display
    }
    prevCssProp.current = {
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      borderTopWidth,
      borderBottomWidth,
      borderLeftWidth,
      borderRightWidth,
      width: width || rectWidth + 'px',
      height: height || rectHeight + 'px',
      overflowX,
      overflowY,
      overflow
    }
    prevSize.current = {
      width,
      height
    }
  }

  const handleTransitionEnd: TransitionEventHandler = (e) => {
    const {overflowX, overflowY, overflow} = prevCssProp.current
    const {width, height} = prevSize.current
    setNodeStyle({overflowX, overflowY, overflow, width, height})
  };

  return (
    <div
      ref={containerRef}
      onTransitionEnd={handleTransitionEnd}
    >
      {props.children}
    </div>
  );
};

export default Unfold;



