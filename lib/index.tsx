import ReactDOM from 'react-dom';
import * as React from 'react';
import Icon from './Icon';

ReactDOM.render(<div>
    <Icon name="wechat" onClick={() => {
        console.log(111)
    }}/>
</div>, document.getElementById('root'));
