import React, {Component} from 'react';
import TodoStore from '../stores/TodoStore';
import { browserHistory } from 'react-router';

class TodoForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            done: false
        };
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handleChangeDone(event) {
        this.setState({done: event.target.value});
    }

    add() {
        if (!this.state.name) {
            return;
        }
        let todo = {
            name: `${this.state.name}`,
            description: `${this.state.description}`,
            done: `${this.state.done}`
        }
        TodoStore.add(todo);

        browserHistory.push('/');
    }

    render() {
        return (
            <div>
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
                                value={this.state.done}  
                                onChange={this.handleChangeDone.bind(this)} 
                                type="checkbox" 
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-default" onClick={this.add.bind(this)}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoForm;