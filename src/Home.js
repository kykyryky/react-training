import React, {Component} from 'react';
import {connect} from 'react-redux';

import CategoryList from './category/CategoryList';
import TodoList from './todo/TodoList';
import Progress from './common/Progress';
import SearchBar from './common/SearchBar';

import {addCategory, deleteCategory, addTodo, deleteTodo} from './store/actions';
import {flatten, searchById, getProgress, filter} from './store/utils';

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

    render() {
        return (
            <div className='home-container'>
                <SearchBar/>
                {
                    this.props.pending && <div className="loader"/>
                }
                <div className="row">                 
                    <Progress progress={this.props.progress}/>
                    <CategoryList 
                        categories={this.props.categories}
                        selected={this.state.selected}
                        filter={this.props.filter}
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
    const progress = getProgress(flatten({children: state.categories}));
    const filteredTree = [...state.categories];
    filter(filteredTree, ownProps.location.query);
    const categories = flatten({children: filteredTree});

    return {
        progress: progress,
        selected,
        categories: categories,
        pending: state.pending
    }
}


export default connect(mapStateToProps)(Home);