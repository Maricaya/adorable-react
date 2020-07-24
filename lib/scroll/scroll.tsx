import * as React from 'react';
import './scroll.scss';
import {HTMLAttributes, useEffect, useRef, useState} from 'react';
import {scrollbarWidth} from './scrollbar-width';
import {UIEventHandler, MouseEventHandler, TouchEventHandler} from 'react';
import {scopedClassMaker} from '../helpers/classes';
import {Icon} from '../../lib';

type Props = {
  onPull?: () => void;
} & HTMLAttributes<HTMLDivElement>

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

  const [translateY, _setTranslateY] = useState(0);
  const setTranslateY = (y: number) => {
    if (y < 0) {y = 0;} else if (y > 150) {y = 150;}
    _setTranslateY(y);
  };
  const lastYRef = useRef(0);
  const moveCount = useRef(0);
  const pulling = useRef(false);
  const onTouchStart: TouchEventHandler = (e) => {
    const scrollTop = containerRef.current!.scrollTop;
    if (scrollTop !== 0) {return;}
    pulling.current = true;
    lastYRef.current = e.touches[0].clientY;
    moveCount.current = 0;
  };
  const onTouchMove: TouchEventHandler = (e) => {
    const deltaY = e.touches[0].clientY - lastYRef.current;
    moveCount.current += 1;
    if (moveCount.current === 1 && deltaY < 0) {
      pulling.current = false;
      return;
    }
    if (!pulling.current) {return;}
    setTranslateY(translateY + deltaY);
    lastYRef.current = e.touches[0].clientY;
  };
  const onTouchEnd: TouchEventHandler = () => {
    if (pulling.current) {
      props.onPull && props.onPull();
      setTranslateY(0);
      pulling.current = false;
    }
  };
  return (
    <div className={sc('')} {...rest}>
      <div className={sc('inner')}
           style={{
             right: -scrollbarWidth(),
             transform: `translateY(${translateY}px)`
           }}
           ref={containerRef}
           onTouchMove={onTouchMove}
           onTouchStart={onTouchStart}
           onTouchEnd={onTouchEnd}
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

      <div className={sc('pulling')}
           style={{height: translateY}}>
        {translateY >= 100 ?
          <span className={sc('text')}>释放手指即可更新</span> :
          <Icon className={sc("icon")} name="arrow-down"/>}
      </div>
    </div>
  );
};


export default Scroll;
