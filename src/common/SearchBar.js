import React, {Component} from 'react';
import { browserHistory } from 'react-router';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filterTextInput: props.filterTextInput,
            onlyDone: props.onlyDone
        }
    }
  
    handleChange() {
        browserHistory.push(`${browserHistory.getCurrentLocation().pathname}?filterTextInput=${this.filterTextInput.value}&onlyDone=${this.onlyDone.checked}`);
    }

    render() {
        return (
            <div className='constainer'>
                <div className='offset-md-9'>
                    <div className="form-group form-inline">
                        <input type="text"
                            value={this.props.filterTextInput}
                            onChange={this.handleChange.bind(this)} 
                            ref={(input) => this.filterTextInput = input}
                            className="form-control col-offset-md-2" 
                            placeholder="Search..."/>

                        <label>
                            <input
                                type="checkbox"
                                checked={this.props.onlyDone}
                                ref={(input) => this.onlyDone = input}
                                onChange={this.handleChange.bind(this)}/> Done
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;