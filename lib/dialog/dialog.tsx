import * as React from 'react';

type DialogProps = {
  visible: boolean
}
// & React.HTMLAttributes<Element>

const Dialog: React.FunctionComponent<DialogProps> = (props) => {
  return (<>
    {props.visible ? <div>dialog</div> : null}
    </>);
};
export default Dialog;

