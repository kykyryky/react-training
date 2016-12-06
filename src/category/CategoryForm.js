import React, {Component} from 'react';
import CategoryService from '../service/CategoryService';
import { browserHistory } from 'react-router';

class CategoryForm extends Component {
    constructor() {
        super();
        this.state = {
            newCategoryName:''
        };
    }

    handleChangeCategoryName(event) {
        this.setState({newCategoryName: event.target.value});
    }

    addCategory() {
        if (!this.state.newCategoryName) {
            return;
        }
        let category = {
            name: `${this.state.newCategoryName}`
        }
        CategoryService.add(category);

        browserHistory.push('/');
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-7 form-group form-inline">
                        <label>Name: </label>
                        <input type="text"
                            value={this.state.newCategoryName} 
                            onChange={this.handleChangeCategoryName.bind(this)} 
                            className="form-control" 
                            placeholder="Category name"/>
                        <button type="submit" className="btn btn-default" onClick={this.addCategory.bind(this)}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryForm;