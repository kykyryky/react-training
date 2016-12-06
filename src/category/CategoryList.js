import React, {Component} from 'react';
import Category from './Category';

import CategoryService from '../service/CategoryService';

class CategoryList extends Component {
    constructor() {
        super();        
        this.state = {
            index: 10,
            newCategoryName: '',
            categories: CategoryService.list()        
        }
    }

    componentWillMount() {
        this.setState({
            categories: CategoryService.list(),
            newCategoryName: ''
        });
    }

    onClickAddCategory(parent) {
        if (!this.state.newCategoryName) {
            return;
        }
        let category = {
            name: `${this.state.newCategoryName}`
        }
        CategoryService.add(category);
        this.setState({
            categories: CategoryService.list(),
            newCategoryName: ''
        });
    }

    removeCategory(id) {
        CategoryService.remove(id);
        this.setState({
            'categories': CategoryService.list()
        });
    }

    handleChangeCategoryName(event) {
        this.setState({newCategoryName: event.target.value});
    }

    render() {
        return (
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-7 form-group form-inline">
                        <label>Name: </label>
                        <input type="text"
                            value={this.state.newCategoryName} 
                            onChange={this.handleChangeCategoryName.bind(this)} 
                            className="form-control" 
                            placeholder="Category name"/>
                        <button type="submit" className="btn btn-default" onClick={this.onClickAddCategory.bind(this)}>Add</button>
                    </div>
                </div>
                <table className="table table-condensed">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>                    
                    { this.state.categories.map((category, index) => {
                        return <Category 
                                key={category.id} 
                                model={category} 
                                onDelete={this.removeCategory.bind(this)}>
                        </Category>;
                    }
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CategoryList;