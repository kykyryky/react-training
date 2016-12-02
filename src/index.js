import React from 'react';

import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import App from './App';
import Home from './Home';
import CategoryForm from './category/CategoryForm';
import TodoForm from './todo/TodoForm';

import './index.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home}/>
      <Route path="category/add/:parentId" component={CategoryForm}/>
      <Route path="category/edit/:categoryId" component={CategoryForm}/>
      <Route path="todo/:todoId" component={TodoForm}/>      
    </Route>
  </Router>
  ),
  document.getElementById('root')
);

