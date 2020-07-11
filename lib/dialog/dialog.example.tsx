import * as React from 'react';
import {useState} from 'react';
import Dialog, {alert, confirm, modal} from './dialog';
import {Button} from '../index';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);
  const openModal = () => {
    const close = modal(<h1>你好
      {/* 注意：不能写成 onClick=close
          因为解析器是从右往左执行的，先找 close 发现没定义。
          () => close() 函数写法是延迟执行的 只有用户点击按钮时，编译器才会看这行，所以不会报错。
       */}
      <button onClick={() => close()}>close</button>
    </h1>);
  };
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} buttons={
        [
          <Button onClick={() => {setX(false);}}>1</Button>,
          <Button onClick={() => {setX(false);}}>2</Button>,
        ]
      } onClose={() => {setX(false);}}>
        <strong>hi</strong>
      </Dialog>
      <div>
        <h1>alert</h1>
        <Button onClick={() => alert('1')}>alert</Button>
        <h1>confirm</h1>
        <Button onClick={() => confirm('1',
          () => {console.log('yes')},
          () => {console.log('no')}
        )}>confirm</Button>
        <h1>modal</h1>
        <Button onClick={() => openModal()}>modal</Button>
      </div>
    </div>
  );
};

export default DialogExample;
