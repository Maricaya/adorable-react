import * as React from 'react';
import {useState} from 'react';
import ReactDOM from 'react-dom';
import {scopedClassMaker} from '../helpers/classes';
import './citySelect.scss';

const scopedClass = scopedClassMaker('xue-citySelect');
const sc = scopedClass;

type DialogProps = {
  onClose: () => void
}

const Dialog: React.FC<DialogProps> = (props) => {
  return ReactDOM.createPortal((
    <div className={sc('dialog')}
         onClick={props.onClose}
    >弹出内容</div>
  ), document.body);
};

interface Props {
}

const CitySelect: React.FC<Props> = (props) => {
  const [dialogVisible, setDialogVisible] = useState(true);
  const onClick = () => {setDialogVisible(true);};
  const onClose = () => {setDialogVisible(false);};

  return (
    <>
      <div onClick={onClick}>{props.children}</div>
      {dialogVisible && <Dialog onClose={onClose}/>}
    </>);
};

export default CitySelect;
