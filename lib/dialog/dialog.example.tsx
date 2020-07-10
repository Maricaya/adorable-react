import * as React from 'react';
import {useState} from 'react';
import Dialog from './dialog';
import {Button} from '../index';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(true);
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x} buttons={
        [
          <Button>1</Button>,
          <Button>2</Button>,
        ]
      } onClose={() => {setX(false);}}>
        <strong>hi</strong>
      </Dialog>
    </div>
  );
};

export default DialogExample;
