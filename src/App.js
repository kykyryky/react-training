import React, { Component } from 'react';
import './App.css';

import Header from './header/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>To-Do List</h2>
        </div>

          <Header/>
      </div>
    );
  }
}

export default App;
