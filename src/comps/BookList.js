import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookList extends Component {
    state = {
        list: this.props.list,
    }

    render() {
        const books = this.state.list;

        return (
            <div className="book-list">
                {books.map(book => (
                    <p>{book}</p>
                ))}
            </div>
        )
    }
}

BookList.defaultProps = {
    list: []
}

BookList.propTypes = {
    list: PropTypes.array.isRequired
}

export default BookList;
