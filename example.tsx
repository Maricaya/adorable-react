import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Link} from 'react-router-dom';
import IconExample from './lib/icon/icon.example'
import ButtonExample from './lib/button.example';
// import 'examples/global.scss';

void 'examples 不要改动这一行代码！'; // tslint:disable-line

ReactDOM.render(
  <Router>
    <div>
      <header>
        <div className="logo">xue-ui</div>
      </header>
      <div>
        <aside>
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">
                icon
              </Link>
            </li>
            <li>
              <Link to="button">
                button
              </Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/icon" component={IconExample}/>
          <Route path="/button" component={ButtonExample}/>
        </main>
      </div>
    </div>
  </Router>
  , document.querySelector('#root'));
