import React, {Component} from 'react';
import Category from './Category';
import TodoList from '../todo/TodoList';
import CategoryStore from '../stores/CategoryStore';

class CategoryList extends Component {
    constructor() {
        super();        
        this.state = {
            newCategoryName: '',
            selected: {todos: []},
            categories: []        
        }
    }

    componentWillMount() {
        this.setState({
            categories: CategoryStore.list(),
            newCategoryName: '',
            selected: {todos: []},
        });
    }

    onClickAddCategory(parent) {
        if (!this.state.newCategoryName) {
            return;
        }
        let category = {
            name: `${this.state.newCategoryName}`
        }
        CategoryStore.add(category);
        this.setState({
            categories: CategoryStore.list(),
            newCategoryName: ''
        });
    }

    onClickCategory(category) {
        this.setState({
            selected: category
        })
    }

    removeCategory(id) {
        CategoryStore.remove(id);
        this.setState({
            categories: CategoryStore.list()
        });
    }

    handleChangeCategoryName(event) {
        this.setState({newCategoryName: event.target.value});
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6">
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
                        { this.state.categories.map((category, index) => {
                            return <Category 
                                    onSelect={this.onClickCategory.bind(this)}
                                    key={category.id} 
                                    model={category} 
                                    onDelete={this.removeCategory.bind(this)}>
                            </Category>;
                        }
                        )}
                        </tbody>
                    </table>
                </div>

                <TodoList selected={this.state.selected}/>
            </div>
        );
    }
}

export default CategoryList;