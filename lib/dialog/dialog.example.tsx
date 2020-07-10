import * as React from 'react';
import {useState} from 'react';
import Dialog from './dialog';

const DialogExample: React.FunctionComponent = () => {
  const [x, setX] = useState(true);
  return (
    <div>
      <button onClick={() => setX(!x)}>click</button>
      <Dialog visible={x}>
        <strong>hi11111</strong>
      </Dialog>
    </div>
  );
};

export default DialogExample;
