import React from 'react';
import { shallow } from 'enzyme';

import Home from './Home';
import CategoryList from './category/CategoryList';

const state = {
    categories: [{id:1, name: 'name', description: 'description', children: [], todos: []}]
}
const store = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => state
};

const props = {
    store,
    params: {},
    location: {}
}

describe('<Home />', () => {
  it('renders three <Home /> components', () => {
    const wrapper = shallow(<Home {...props}/>);        
  });
});
