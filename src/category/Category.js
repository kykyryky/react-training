import React, {Component} from 'react';

class Category extends Component {
    onDelete() {
        this.props.onDelete(this.props.model.id);
    }

    render() {
        return (
            <li>
                <div>
                    <div className='item-name'>
                        {this.props.model.name}
                    </div>

                    <div className='btn-panel'>
                        <div className='btn'>
                            <span>&#43;</span>
                        </div>

                        <div className='btn'>
                            <span>&#9998;</span>
                        </div>

                        <div className='btn' onClick={this.onDelete.bind(this)}>
                            <span>&#10006;</span>
                        </div>                        
                    </div>
                </div>
            </li>
        );
    }
}

export default Category; 