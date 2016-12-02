import React, {Component} from 'react';
import Category from './Category';

class CategoryList extends Component {
    constructor() {
        super();        
        this.state = {
            index: 1,
            newCategoryName: '',
            categories: []            
        }

        while (this.state.index <= 5) {
            this.state.categories.push({id: this.state.index, name: `Category ${this.state.index}`});
            this.state.index++;
        }
    }

    addCategory(parent) {
        if (!this.state.newCategoryName) {
            return;
        }
        this.setState({
            'categories': [...this.state.categories, {id: this.state.index, name: `${this.state.newCategoryName}`}]
        });        
        this.state.index++;
        this.setState({newCategoryName: ''});
    }

    removeCategory(id) {
        let index = this.state.categories.findIndex((category) => category.id === id);
        this.state.categories.splice(index, 1);

        this.setState({
            'categories': [...this.state.categories]
        });
    }

    editCategory(category) {

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
                        <button type="submit" className="btn btn-default" onClick={this.addCategory.bind(this)}>Add</button>
                    </div>
                </div>
                <table class="table table-condensed">
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
                </table>
            </div>
        );
    }
}

export default CategoryList;