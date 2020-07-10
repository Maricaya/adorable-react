import * as React from 'react';
import {Fragment, ReactElement} from 'react';
import './dialog.scss';
import {Icon} from '../index';
import {scopedClassMaker} from '../class';
import ReactDOM from 'react-dom';

type DialogProps = {
  visible: boolean;
  buttons: ReactElement[];
  onClose: React.MouseEventHandler;
  closeOnClickMask?: boolean;
}

const scopedClass = scopedClassMaker('xue-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  const onClickClose: React.MouseEventHandler = (e) => {
    props.onClose(e);
  };
  const x =
    props.visible ?
      <Fragment>
        <div className={sc('mask')}>
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
            {props.buttons.map((button, i) =>
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
export default Dialog;

