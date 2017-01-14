import React, {Component} from 'react';
import { Link } from 'react-router';
import './Category.css';

class Category extends Component {
    countLeft() {
        return {
            paddingLeft: this.props.model.level * 15
        }
    }

    active(current, selected) {
        return current == selected ? 'active': '';
    }

    onDelete() {
        this.props.onDelete(this.props.model.id);
    }

    onSelect() {
        this.props.onSelect(this.props.model);
    }

    render() {
        return (
            <tr className={this.active(this.props.model.id, this.props.selected)} style={{display: this.props.hide ? 'none' : '' }}>
                <td onClick={this.onSelect.bind(this)} role="button" style={this.countLeft()}>
                    <a href='#'>
                        {this.props.model.name}
                    </a>
                </td>

                <td>
                    {this.props.model.description}
                </td>

                {
                !this.props.readOnly && 
                    <td>
                        <Link to={`/category/add/${this.props.model.id}`}>
                                <button type="button" className="btn btn-default">
                                    Add child
                                </button>
                            </Link>                    
                        
                    </td>
                }
                {
                !this.props.readOnly && 
                    <td>
                        <Link to={`/category/edit/${this.props.model.id}`}>
                            <button type="button" className="btn btn-default">
                                Edit
                            </button>
                        </Link>                    
                    </td>
                }
                {
                !this.props.readOnly && 
                    <td>
                        <button  type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
                    </td> 
                }
            </tr>
        );
    }
}

export default Category; 