import React from 'react';

import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import Home from './Home';
import CategoryForm from './category/CategoryForm';
import TodoForm from './todo/TodoForm';

import './index.css';

import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {appReducers} from './store/reducers';

const store = createStore(combineReducers({categories: appReducers}), {
  categories: []
});

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="selected/:id" component={Home}/>
        <Route path="category/:mode/:id" component={CategoryForm}/>
        <Route path="todo/:categoryId/:id" component={TodoForm}/>      
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('root')
);