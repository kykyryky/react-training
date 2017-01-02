import React, {Component} from 'react';
import {connect} from 'react-redux';

import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';
import {addCategory, deleteCategory, addTodo, deleteTodo} from './stores/actions';
import {flatten} from './stores/utils';

class Home extends Component {
    constructor() {
        super();        
        this.state = {
            selected: null
        }
    }

    addCategory(category) {
        this.props.dispatch(addCategory(category));
    }

    deleteCategory(id) {
        this.props.dispatch(deleteCategory(id));
    }

    changeSelected(category) {
        this.setState({selected: category});
    }

    addTodo(catalogId, todo) {
        this.props.dispatch(addTodo(catalogId, todo));
    }

    deleteTodo(catalogId, id) {
        this.props.dispatch(deleteTodo(catalogId, id));
    }

    render() {
        return (
            <div className='home-container'>
                <div className="row">
                    <CategoryList 
                        categories={this.props.categories}
                        addCategory={this.addCategory.bind(this)} 
                        changeSelected={this.changeSelected.bind(this)}
                        deleteCategory={this.deleteCategory.bind(this)}/>                
                    {
                        this.state.selected && 
                        <TodoList 
                            addTodo={this.addTodo.bind(this)} 
                            deleteTodo={this.deleteTodo.bind(this)} 
                            selected={this.state.selected}/>                                            
                    }
                    
                </div>   
            </div>   
        );
    }
}
const mapStateToProps = (state) => {
  return {
    categories: flatten({children: state.categories})
  }
}


export default connect(mapStateToProps)(Home);