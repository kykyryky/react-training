import React, {Component} from 'react';
import CategoryService from '../service/CategoryService';
import { browserHistory } from 'react-router';

class CategoryForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: ''
        };
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    add() {
        if (!this.state.name) {
            return;
        }
        let category = {
            name: `${this.state.name}`,
            description: `${this.state.description}`
        }
        CategoryService.add(category);

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
                            placeholder="Category name"/>                        
                    </div>

                    <div className="form-group">
                        <label>Description: </label>

                        <textarea className="form-control" rows="3"
                            value={this.state.description} 
                            onChange={this.handleDescription.bind(this)}  
                            placeholder="Description"
                        ></textarea>                        
                    </div>

                    <button type="submit" className="btn btn-default" onClick={this.add.bind(this)}>Add</button>
                </div>
            </div>
        );
    }
}

export default CategoryForm;