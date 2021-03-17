import React from 'react';

import { TweetsComponent } from './tweets'
import logo from './logo.svg';
import './App.css';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TweetsComponent />
         {/* <TweetList /> */}
      </header>
    </div>
  );
}

export default App;
