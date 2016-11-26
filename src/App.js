import React, { Component } from 'react';
import './App.css';

import Header from './header/Header';
import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Header/>
          <CategoryList/>
          <TodoList/>
      </div>
    );
  }
}

export default App;
