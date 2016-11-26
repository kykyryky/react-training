import React, {Component} from 'react';
import Todo from './Todo';

import './../common/List.css';
import './TodoList.css';


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
            'todos': this.state.todos.concat([{id: this.state.index, name: `${this.state.todoName}`}])
        });        
        this.state.index++;
        this.setState({todoName: ''});
    }

    removeTodo(id) {
        let index = this.state.todos.findIndex((todo) => todo.id === id);
        this.state.todos.splice(index, 1);

        this.setState({
            'todos': [].concat(this.state.todos)
        });
    }

    render() {
        return (
            <div className="list todo-list">
                <div className="header">
                    <div className="header-panel">
                        <input 
                            type="text" 
                            className="input-field"
                            value={this.state.todoName} 
                            onChange={this.handleChangeTodoName.bind(this)}
                            /> 
                        <div className="btn" onClick={this.addTodo.bind(this)} ><span>Add</span></div>
                    </div>
                </div>
                <ul>
                    { this.state.todos.map((todo, index) => {
                        return <Todo 
                                key={todo.id} 
                                model={todo} 
                                onDelete={this.removeTodo.bind(this)}>
                        </Todo>;
                    }
                    )}
                </ul>
            </div>            
        );
    }    
}

export default TodoList;