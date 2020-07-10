import * as React from 'react';
import {useState} from 'react';
import Dialog, {alert} from './dialog';
import {Button} from '../index';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(false);
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
        <h1>example 3</h1>
        <button onClick={() => alert('1')}>alert</button>
      </div>
    </div>
  );
};

export default DialogExample;
