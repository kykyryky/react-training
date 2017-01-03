import React, {Component} from 'react';

class Progress extends Component {
    progress () {
        return {
            width: `${this.props.progress}%`
        }
    }
    render() {
        return (
            <div className='col-md-12'>
                <div className='progress'>
                    <div className='progress-bar' role='progressbar' aria-valuenow={this.props.progress}
                    aria-valuemin='0' aria-valuemax='100' style={this.progress()}>
                        <span className='sr-only'>{this.props.progress}% Complete</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;