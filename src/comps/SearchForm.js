import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchForm extends Component {
    state = {
        value: ''
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({value});
    }

    render() {
        return (
            <div className="search-form">
                {this.props.showLabel && (
                    <label className="search-form__label" htmlFor="search-books">
                        Search Books:
                    </label>
                )}
                <input
                    className="search-form__input"
                    type="text"
                    placeholder="Search here..."
                    value={this.state.value}
                    onChange={this.handleChange} />
            </div>
        )
    }
}

SearchForm.propTypes = {
    showLabel: PropTypes.bool
}

SearchForm.defaultProps = {
    showLabel: true
}

export default SearchForm;
