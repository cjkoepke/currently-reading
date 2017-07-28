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
        console.log(this.props.book.title, this.props.book.shelf, this.state.shelf)
        return(
            <select onChange={this.handleShelfSelect} value={this.state.shelf} className="book-location-picker">
                <option disabled label="Choose a Shelf:" />
                <option value="wantToRead">Want to Read</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="read">Have Read</option>
                <option value="none">None</option>
            </select>
        )
    }
}

BookLocationPicker.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookLocationPicker;
