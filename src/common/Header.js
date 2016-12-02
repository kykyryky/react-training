import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
            <Link to={'/home'}>
                <div className='header col-md-12'>
                    <h1>
                        To-Do List
                    </h1>
                </div>
            </Link>
        );   
    }
}

export default Header;