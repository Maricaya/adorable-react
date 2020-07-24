import * as React from 'react';
import './scroll.scss';
import {HTMLAttributes, useEffect, useRef, useState} from 'react';
import {scrollbarWidth} from './scrollbar-width';
import {UIEventHandler} from 'react';
import {scopedClassMaker} from '../helpers/classes';
import {MouseEventHandler} from 'react';

type Props = {} & HTMLAttributes<HTMLDivElement>

const scopedClass = scopedClassMaker('xue-scroll');
const sc = scopedClass;

const Scroll: React.FunctionComponent<Props> = (props) => {
  const {children, ...rest} = props;
  const [barHeight, setBarHeight] = useState(0);
  const [barVisible, setBarVisible] = useState(false);
  const [barTop, _setBarTop] = useState(0);

  const setBarTop = (number: number) => {
    if (number < 0) {return;}
    const {current} = containerRef;
    const {scrollHeight} = current!;
    const viewHeight = current!.getBoundingClientRect().height;
    const maxBarTop = (scrollHeight - viewHeight) * viewHeight / scrollHeight;
    if (number > maxBarTop) {return;}
    _setBarTop(number);
  };

  const timerIdRef = useRef<number | null>(null);
  const onScroll: UIEventHandler = () => {
    setBarVisible(true);
    const {current} = containerRef;
    const {scrollHeight, scrollTop} = current!;
    const viewHeight = current!.getBoundingClientRect().height;
    setBarTop(scrollTop * viewHeight / scrollHeight);
    /* 防抖 */
    if (timerIdRef.current !== null) {
      window.clearTimeout(timerIdRef.current);
    }
    timerIdRef.current = window.setTimeout(() => {
      setBarVisible(false);
    }, 300);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => { // mounted 时，计算
    const scrollHeight = containerRef.current!.scrollHeight;
    const viewHeight = containerRef.current!.getBoundingClientRect().height;
    setBarHeight(viewHeight * viewHeight / scrollHeight);
  }, []);

  // 组件刷新，这个值不能改变，使用 useRef
  const draggingRef = useRef(false);
  const firstYRef = useRef(0);
  const firstBarTopRef = useRef(0);
  const onMouseDownBar: MouseEventHandler = (e) => {
    draggingRef.current = true;
    firstYRef.current = e.clientY;
    firstBarTopRef.current = barTop;
  };
  const onMouseMoveBar = (e: MouseEvent) => {
    if (draggingRef.current) {
      const {scrollHeight} = containerRef.current!;
      const delta = e.clientY - firstYRef.current;
      const newBarTop = firstBarTopRef.current + delta;
      const viewHeight = containerRef.current!.getBoundingClientRect().height;
      setBarTop(newBarTop);
      containerRef.current!.scrollTop = newBarTop * scrollHeight / viewHeight;
    }
  };
  const onMouseUpBar = () => {
    draggingRef.current = false;
  };

  const onSelect = (e: Event) => {
    if (draggingRef.current) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', onMouseUpBar);
    document.addEventListener('mousemove', onMouseMoveBar);
    document.addEventListener('selectstart', onSelect);
    return () => {
      document.removeEventListener('mouseup', onMouseUpBar);
      document.removeEventListener('mousemove', onMouseMoveBar);
      document.removeEventListener('selectstart', onSelect);
    };
  }, []);

  return (
    <div className={sc('')} {...rest}>
      <div className={sc('inner')}
           style={{right: -scrollbarWidth()}}
           ref={containerRef}
           onScroll={onScroll}>
        {children}
      </div>
      {barVisible && <div className={sc('track')}>
        {/* 不使用 top，使用 transform */}
        <div className={sc('bar')}
             style={{height: barHeight, transform: `translateY(${barTop}px)`}}
             onMouseDown={onMouseDownBar}
        />
      </div>}
    </div>
  );
};


export default Scroll;
