import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';
import {addCategory, deleteCategory, addTodo, deleteTodo} from './store/actions';
import {flatten, searchById} from './store/utils';

class Home extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            selected: props.selected
        }
    }

    addCategory(category) {
        this.props.dispatch(addCategory(category));
    }

    deleteCategory(id) {
        this.props.dispatch(deleteCategory(id));
    }

    changeSelected(category) {
        console.log(category);
        this.setState({selected: category});
    }

    addTodo(catalogId, todo) {
        this.props.dispatch(addTodo(catalogId, todo));
    }

    deleteTodo(catalogId, id) {
        this.props.dispatch(deleteTodo(catalogId, id));
    }

    progress () {
        return {
            width: `${this.props.progress}%`
        }
    }

    render() {
        return (
            <div className='home-container'>

                <div className="row">
                    <div className='col-md-12'>
                        <div className='progress'>
                            <div className='progress-bar' role='progressbar' aria-valuenow={this.props.progress}
                            aria-valuemin='0' aria-valuemax='100' style={this.progress()}>
                                <span className='sr-only'>{this.props.progress}% Complete</span>
                            </div>
                        </div>
                    </div>
                    <CategoryList 
                        categories={this.props.categories}
                        selected={this.state.selected}
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
const mapStateToProps = (state, ownProps) => {
    const selected = ownProps.params.id ? searchById(state.categories, ownProps.params.id) : null;
    const categories = flatten({children: state.categories});
    const all = categories.length;
    const completed =_.reduce(categories, (result, value) => {
        if (_.isEmpty(value.todos)) {
            return result;
        }
        console.log(value);
        for (const todo of value.todos) {
            if (!todo.done) {
                return result;
            }            
        }
        return ++result;
    }, 0);

    const progress = completed/all * 100;

    return {
        progress: progress,
        selected,
        categories: categories
    }
}


export default connect(mapStateToProps)(Home);