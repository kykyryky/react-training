import React, {Component} from 'react';
import Todo from './Todo';

import TodoStore from '../stores/TodoStore';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todoName: '' 
        }
    }

    componentWillMount() {
        this.setState({
            todoName: ''
        });
    }

    handleChangeTodoName(event) {
        this.setState({todoName: event.target.value});
    }

    addTodo() {
        if (!this.state.todoName) {
            return;
        }
        const todo = {
            name: `${this.state.todoName}`
        };
        
        TodoStore.add(this.props.selected.id, todo);
        this.setState({
            todoName: ''
        });
    }

    removeTodo(id) {
        TodoStore.remove(this.props.selected.id, id);
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-7 form-group form-inline">
                        <input type="text"
                            value={this.state.todoName} 
                            onChange={this.handleChangeTodoName.bind(this)}
                            className="form-control" 
                            placeholder="Todo name"/>
                        <button className="btn btn-default" onClick={this.addTodo.bind(this)}>Add</button>
                    </div>
                </div>
                <table className="table table-striped">                    
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Done</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>                    
                    { this.props.selected.todos.map((todo, index) => {
                        return <Todo 
                                key={todo.id} 
                                model={todo} 
                                onDelete={this.removeTodo.bind(this)}>
                        </Todo>;
                    }
                    )}
                    </tbody>
                </table>
            </div>            
        );
    }    
}

export default TodoList;