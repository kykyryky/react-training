import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import Header from './common/Header';

class App extends Component {
  render() {
    return (
      <div className="App container">
          <Header/>
          {this.props.children}
      </div>
    );
  }
}

export default App;
