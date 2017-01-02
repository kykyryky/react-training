import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import {connect} from 'react-redux';

import {addTodo, updateTodo, deleteTodo} from '../store/actions';
import {searchById} from '../store/utils';
import {flatten} from '../store/utils';

import Category from '../category/Category';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.categoryId,
            name: props.name,
            description: props.description,
            done: props.done
        };
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeDone(event) {
        this.setState({done: event.target.checked});
    }

    onClickCategory(category) {
        this.setState({selected: category.id});
    }

    save() {
        if (!this.state.name) {
            return;
        }
        let todo = {
            id: this.props.id,
            name: `${this.state.name}`,
            description: `${this.state.description || ''}`,
            done: `${this.state.done}`
        }

        if (this.props.categoryId == this.state.selected) {
            this.props.dispatch(updateTodo(this.props.categoryId, todo));
        } else {
            this.props.dispatch(deleteTodo(this.props.categoryId, todo.id));
            this.props.dispatch(addTodo(this.state.selected, todo));            
        }
        
        browserHistory.push(`/selected/${this.props.categoryId}`);
    }

    render() {
        return (
            <div>
                <div className="col-md-6">
                    <table className="table table-striped"  id="categoty-list">
                        <tbody>                   
                        { 
                            this.props.categories.map((category, index) => {
                            return <Category 
                                    onSelect={this.onClickCategory.bind(this)}
                                    selected={this.state.selected}
                                    key={category.id}
                                    model={category}
                                    readOnly={true}>
                            </Category>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                value={this.state.name} 
                                onChange={this.handleChangeName.bind(this)} 
                                className="form-control" 
                                placeholder="Todo name"/>                        
                        </div>

                        <div className="form-group">
                            <label>Description: </label>

                            <textarea className="form-control" rows="3"
                                value={this.state.description} 
                                onChange={this.handleDescription.bind(this)}  
                                placeholder="Description"
                            ></textarea>                        
                        </div>

                        <div className="checkbox">
                            <label>
                                <input
                                    checked={this.state.done}  
                                    onChange={this.handleChangeDone.bind(this)} 
                                    type="checkbox" 
                                /> Done
                            </label>
                        </div>

                        <button type="submit" className="btn btn-default" onClick={this.save.bind(this)}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

const propsMapper = (state, ownProps) => {
    const category = searchById(state.categories, ownProps.params.categoryId);
    const {id, done, name, description} = searchById(category.todos, ownProps.params.id);

    return {
        categoryId: ownProps.params.categoryId,
        categories: flatten({children: state.categories}),
        id, done, name, description
    };    
}

export default connect(propsMapper)(TodoForm);