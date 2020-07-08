import ReactDOM from 'react-dom';
import * as React from 'react';
import Icon from './Icon';

const fn = (e: React.MouseEvent<SVGElement | SVGUseElement>) => {
    console.log(e.target);
    console.log((e.target as SVGUseElement).x)
};

ReactDOM.render(<div>
    <Icon name="wechat"
          onClick={fn}
          onMouseEnter={fn}
    />
</div>, document.getElementById('root'));
