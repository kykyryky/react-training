import React, {Component} from 'react';
import Category from './Category';
import {filter} from './../store/utils';

class CategoryList extends Component {
    constructor() {
        super();        
        this.state = {
            newCategoryName: '',
            selected: null
        }
    }

    componentWillMount() {}

    onClickAddCategory(parent) {
        if (!this.state.newCategoryName) {
            return;
        }
        let category = {
            name: `${this.state.newCategoryName}`
        }
        this.setState({newCategoryName: ''});
        this.props.addCategory(category);
    }

    onClickCategory(selected) {
        this.props.changeSelected(selected);
    }

    deleteCategory(id) {
        this.props.deleteCategory(id);        
    }

    handleChangeCategoryName(event) {
        this.setState({newCategoryName: event.target.value});
    }

    render() {
        return (            
            <div className="col-md-6" id="categoty-list">
                <div className="row">
                    <div className="col-md-7 form-group form-inline">
                        <input type="text"
                            value={this.state.newCategoryName} 
                            onChange={this.handleChangeCategoryName.bind(this)} 
                            className="form-control col-offset-md-2" 
                            placeholder="Category name"/>
                        <button type="submit" className="btn btn-default" onClick={this.onClickAddCategory.bind(this)}>Add</button>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead> 
                    <tbody>                   
                    { 
                        this.props.categories.map((category, index) => {
                        return <Category 
                                onSelect={this.onClickCategory.bind(this)}
                                hide={!filter(category, this.props.filter)}
                                key={category.id}
                                selected={this.props.selected ? this.props.selected.id : null}
                                model={category} 
                                onDelete={this.deleteCategory.bind(this)}>
                        </Category>;
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CategoryList;