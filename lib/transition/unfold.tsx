import * as React from 'react';
import {CSSProperties, HTMLAttributes, TransitionEventHandler, useEffect, useRef} from 'react'
import {useUpdate} from '../hooks/useUpdate'

type UnfoldProps = {
  visible: boolean,
  transitionTime?: number,
  vertical?: boolean
} & HTMLAttributes<HTMLDivElement>

type TransitionEffect = {
  vertical: string,
  horizontal: string
}

type LeaveTo = {
  vertical: CSSProperties,
  horizontal: CSSProperties
}

type PrevSize = {
  width: string | null,
  height: string | null
}

type NodeDisplay = string

const Unfold: React.FC<UnfoldProps> = (props) => {
  const {visible, transitionTime, vertical, ...rest} = props

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
  const nodeDisplay = useRef<NodeDisplay>('block')
  const getNodeSize = () => {
    const node = containerRef.current!
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

  // onMounted
  useEffect(() => {
    getNodeSize();
    transitionEffect.current = {
      vertical: `
      ${transitionTime}ms height cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}ms padding-top cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}ms padding-bottom cubic-bezier(.645, .045, .355, 1)`,
      horizontal: `
      ${transitionTime}ms width cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}ms padding-left cubic-bezier(.645, .045, .355, 1), 
      ${transitionTime}ms padding-right cubic-bezier(.645, .045, .355, 1)`
    }
    if (!visible) {
      containerRef.current!.style.display = 'none'
    }
  }, [])
  const setNodeStyle = (cssProp: object) => {
    Object.keys(cssProp).map((key) => {
      // @ts-ignore
      containerRef.current!.style[key] = cssProp[key]
    })
  }
  const hideNode = () => {
    const node = containerRef.current!
    // 关闭时先获取最新的 node 数据
    getNodeSize()
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
      height
    } = prevCssProp.current
    nodeDisplay.current = node.style.display
    node.style.overflowX = 'hidden'
    node.style.overflowY = 'hidden'
    node.style.overflow = 'hidden'
    if (vertical) {
      setNodeStyle({
        transition: '',
        paddingTop,
        paddingBottom,
        borderTopWidth,
        borderBottomWidth,
        width,
        height
      })
      // enforce repaint
      node.getBoundingClientRect()
      setNodeStyle({
        transition: transitionEffect.current.vertical,
        ...leaveTo.current.vertical
      })
    } else {
      setNodeStyle({
        transition: '',
        paddingLeft,
        paddingRight,
        borderLeftWidth,
        borderRightWidth,
        width,
        height
      })
      // enforce repaint
      node.getBoundingClientRect()
      setNodeStyle({
        transition: transitionEffect.current.horizontal,
        ...leaveTo.current.horizontal
      })
    }
  }

  const showNode = () => {
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
      height
    } = prevCssProp.current

    containerRef.current!.style.display = nodeDisplay.current
    containerRef.current!.style.overflowX = 'hidden'
    containerRef.current!.style.overflowY = 'hidden'
    containerRef.current!.style.overflow = 'hidden'
    if (vertical) {
      setNodeStyle({
        transition: '',
        ...leaveTo.current.vertical
      })
      // enforce repaint
      containerRef.current!.getBoundingClientRect()
      setNodeStyle({
        transition: transitionEffect.current.vertical,
        paddingTop,
        paddingBottom,
        borderTopWidth,
        borderBottomWidth,
        height,
        width
      })
    } else {
      setNodeStyle({
        transition: '',
        ...leaveTo.current.horizontal
      })
      // enforce repaint
      containerRef.current!.getBoundingClientRect()
      setNodeStyle({
        transition: transitionEffect.current.horizontal,
        paddingLeft,
        paddingRight,
        borderLeftWidth,
        borderRightWidth,
        height,
        width
      })
    }
  }
  useUpdate(visible, () => {
    visible ? showNode() : hideNode()
  })

  const handleTransitionEnd: TransitionEventHandler = () => {
    const {overflowX, overflowY, overflow} = prevCssProp.current
    const {width, height} = prevSize.current
    setNodeStyle({overflowX, overflowY, overflow, width, height})
    if (!visible) {
      containerRef.current!.style.display = 'none'
    }
  };

  return (
    <div
      {...rest}
      ref={containerRef}
      onTransitionEnd={handleTransitionEnd}
    >
      {props.children}
    </div>
  );
};

Unfold.defaultProps = {
  transitionTime: 250,
  vertical: true
}

export default Unfold;



