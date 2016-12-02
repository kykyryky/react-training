import React, {Component} from 'react';
import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <CategoryList/>
                <TodoList/>
            </div>   
        );
    }
}

export default Home;