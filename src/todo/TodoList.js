import React, {Component} from 'react';
import Todo from './Todo';

class TodoList extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            index: 1,
            todoName: '' 
        }

        while(this.state.index <= 5) {
            this.state.todos.push({
                id: this.state.index,
                name: `Todo ${this.state.index++}`
            })
        }
    }

    handleChangeTodoName(event) {
        this.setState({todoName: event.target.value});
    }

    addTodo() {
        if (!this.state.todoName) {
            return;
        }
        this.setState({
            'todos': [...this.state.todos, {id: this.state.index, name: `${this.state.todoName}`}]
        });        
        this.state.index++;
        this.setState({todoName: ''});
    }

    removeTodo(id) {
        let index = this.state.todos.findIndex((todo) => todo.id === id);
        this.state.todos.splice(index, 1);

        this.setState({
            'todos': [...this.state.todos]
        });
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-7 form-group form-inline">
                        <label>Name: </label>
                        <input type="text"
                            value={this.state.todoName} 
                            onChange={this.handleChangeTodoName.bind(this)}
                            className="form-control" 
                            placeholder="Todo name"/>
                        <button className="btn btn-default" onClick={this.addTodo.bind(this)}>Add</button>
                    </div>
                </div>
                <table class="table table-condensed">
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                    </tr>
                    { this.state.todos.map((todo, index) => {
                        return <Todo 
                                key={todo.id} 
                                model={todo} 
                                onDelete={this.removeTodo.bind(this)}>
                        </Todo>;
                    }
                    )}
                </table>
            </div>            
        );
    }    
}

export default TodoList;