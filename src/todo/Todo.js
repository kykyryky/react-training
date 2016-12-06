import React, {Component} from 'react';

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
                    <button type="button" className="btn btn-default">Edit</button>                    
                </td>

                <td>
                    <button  type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>Delete</button>
                </td>                        
            </tr>
        );
    }
}

export default Todo;