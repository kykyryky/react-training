import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';

import Header from './header/Header';
import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';


class App extends Component {
  render() {
    return (
      <div className="App container">
          <Header/>
          <CategoryList/>
          <TodoList/>         
      </div>
    );
  }
}

export default App;
