import React, {Component} from 'react';
import CategoryList from './category/CategoryList';

class Home extends Component {
    render() {
        return (
            <div className='home-container'>
                <CategoryList/>
            </div>   
        );
    }
}

export default Home;