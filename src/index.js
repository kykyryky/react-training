import React from 'react';

import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import App from './App';
import Home from './Home';
import CategoryForm from './category/CategoryForm';
import TodoForm from './todo/TodoForm';

import './index.css';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {appReducers, pendingReducers} from './store/reducers';
import promise from 'redux-promise-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const middleware = applyMiddleware(thunk, promise(), logger());
const store = createStore(combineReducers({categories: appReducers, pending: pendingReducers}), {
  categories: [],
  pending: false
}, middleware);

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