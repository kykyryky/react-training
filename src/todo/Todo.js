import React, {Component} from 'react';
import { Link } from 'react-router';

class Todo extends Component {
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
                    {this.props.model.done}
                </td>

                <td>
                    <Link to={`/todo/${this.props.catalog.id}/${this.props.model.id}`}>
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

export default Todo;