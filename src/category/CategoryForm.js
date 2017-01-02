import React, {Component} from 'react';
import { browserHistory } from 'react-router';

import {connect} from 'react-redux';

import {addCategory, updateCategory} from '../stores/actions';
import {searchById} from '../stores/utils';

class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name || '',
            description: this.props.description || ''
        };
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    save() {
        if (!this.state.name) {
            return;
        }
        const category = {
            name: `${this.state.name}`,
            description: `${this.state.description}`
        }
        
        if (this.props.params.mode !== 'edit') {
            this.props.dispatch(addCategory(category, this.props.params.id));
        } else {
            category.id = this.props.id;
            this.props.dispatch(updateCategory(category));
        }

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

                    <button type="submit" className="btn btn-default" onClick={this.save.bind(this)}>Save</button>
                </div>
            </div>
        );
    }
}

const propsMapper = (state, ownProps) => {
    if (ownProps.params.mode !== 'edit') {
        return {};    
    }
    const {id, name, description} = searchById(state.categories, ownProps.params.id);
    return {id, name, description};    
}

export default connect(propsMapper)(CategoryForm);