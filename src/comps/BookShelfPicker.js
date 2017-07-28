import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookLocationPicker extends Component {
    state = {
        shelf: this.props.book.shelf
    }

    handleShelfSelect = (e) => {
        e.preventDefault();
        const shelf = e.target.value;

        if (shelf) {
            this.setState({shelf});
            this.props.handleUpdate(this.props.book, e.target.value);
        }
    }

    render() {
        return(
            <select onChange={this.handleShelfSelect} value={this.state.shelf} className="book-location-picker">
                <option value="">Choose a Shelf:</option>
                <option value="wantToRead">Want to Read</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Have Read</option>
            </select>
        )
    }
}

BookLocationPicker.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookLocationPicker;
