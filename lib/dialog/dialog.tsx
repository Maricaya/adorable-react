import * as React from 'react';
import {ReactNode, Fragment} from 'react';
import './dialog.scss';
import {Icon, Button} from '../index';
import {scopedClassMaker} from '../class';

type DialogProps = {
  visible: boolean;
  children: ReactNode;
}

const scopedClass = scopedClassMaker('xue-dialog');
const sc = scopedClass;

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  return (
    props.visible ?
      <Fragment>
        <div className={sc('mask')}>
        </div>
        <div className={sc()}>
          <div className={sc('close')}>
            <Icon name="close"/>
          </div>
          <header className={sc('header')}>
            提示
          </header>
          <main  className={sc('main')}>
            {props.children}
          </main>
          <footer className={sc('footer')}>
            <Button>ok</Button>
            <Button>cancel</Button>
          </footer>
        </div>
      </Fragment>
      : null
  );
};
export default Dialog;

