import React, {Component} from 'react';
import { Link } from 'react-router';

class Category extends Component {
    onDelete() {
        this.props.onDelete(this.props.model.id);
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.model.name}
                </td>

                <td>
                    {this.props.model.description}
                </td>

                <td>
                    <Link to={`/category/add/${this.props.model.id}`}>
                        <button type="button" className="btn btn-default">
                            Add
                        </button>
                    </Link>                    
                </td>

                <td>
                    <Link to={`/category/edit/${this.props.model.id}`}>
                        <button type="button" className="btn btn-default">
                            Edit
                        </button>
                    </Link>                    
                </td>

                <td>
                    <button  type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
                </td>                        
            </tr>
        );
    }
}

export default Category; 