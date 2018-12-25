import * as React from 'react';
import { FontSizeConsumer } from './component/FontSizeProvider';

import './App.css';
import logo from './logo.svg';
import './reset.css';

class App extends React.Component {
  public render() {
    return (
      <FontSizeConsumer>
        {fontSize =>
          <div className="App" style={{ zoom: fontSize.fontScale }}>
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        }
      </FontSizeConsumer>
    );
  }
}

export default (App);
