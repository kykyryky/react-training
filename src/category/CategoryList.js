import React, {Component} from 'react';
import Category from './Category';

import './../common/List.css';
import './CategoryList.css';

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
            'categories': this.state.categories.concat([{id: this.state.index, name: `${this.state.newCategoryName}`}])
        });        
        this.state.index++;
        this.setState({newCategoryName: ''});
    }

    removeCategory(id) {
        let index = this.state.categories.findIndex((category) => category.id === id);
        this.state.categories.splice(index, 1);

        this.setState({
            'categories': [].concat(this.state.categories)
        });
    }

    editCategory(category) {

    }

    handleChangeCategoryName(event) {
        this.setState({newCategoryName: event.target.value});
    }

    render() {
        return (
            <div className="category-list list">
                <div className="header">
                    <div className="header-panel">
                        <input 
                            type="text" 
                            className="input-field"
                            value={this.state.newCategoryName} 
                            onChange={this.handleChangeCategoryName.bind(this)}
                            /> 
                        <div className="btn" onClick={this.addCategory.bind(this)} ><span>Add</span></div>
                    </div>
                </div>
                <ul>
                    { this.state.categories.map((category, index) => {
                        return <Category 
                                key={category.id} 
                                model={category} 
                                onDelete={this.removeCategory.bind(this)}>
                        </Category>;
                    }
                    )}
                </ul>
            </div>
        );
    }
}

export default CategoryList;