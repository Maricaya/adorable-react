import * as React from 'react';
import {Fragment, ReactElement} from 'react';
import './dialog.scss';
import {Icon} from '../index';
import {scopedClassMaker} from '../class';
import ReactDOM from 'react-dom';

type DialogProps = {
  visible: boolean;
  buttons?: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
}

const scopedClass = scopedClassMaker('xue-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };
  const onClickMask: React.MouseEventHandler = (e) => {
    if (props.closeOnClickMask) {
      props.onClose(e);
    }
  };
  const x =
    props.visible ?
      <Fragment>
        <div className={sc('mask')} onClick={onClickMask}>
        </div>
        <div className={sc()}>
          <div className={sc('close')} onClick={onClickClose}>
            <Icon name="close"/>
          </div>
          <header className={sc('header')}>
            提示
          </header>
          <main className={sc('main')}>
            {props.children}
          </main>
          <footer className={sc('footer')}>
            {props.buttons && props.buttons.map((button, i) =>
              React.cloneElement(button, {key: i})
            )}
          </footer>
        </div>
      </Fragment>
      : null;
  return (
    ReactDOM.createPortal(x, document.body)
  );
};

Dialog.defaultProps = {
  closeOnClickMask: false
};

const alert = (content: string) => {
  // 1. 声明一个组件
  const component = <Dialog visible={true} onClose={() => {
    // 5. 关闭的时候，重新渲染组件，改变组件的 visible 属性
    // 再从 ReactDOM 上卸载掉 div
    // 删除 div
    ReactDOM.render(React.cloneElement(component, {visible:false}), div);
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }}>
    {content}
  </Dialog>;
  // 2. 声明一个 div
  const div = document.createElement('div');
  // 3. 把 div 放在 body 中
  document.body.append(div);
  // 4. 把组件放在 div 中
  // 这样就是动态地创建一个 div，在 div 中放一个组件
  ReactDOM.render(component, div);
};

export {alert};

export default Dialog;

