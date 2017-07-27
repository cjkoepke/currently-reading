import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
    render() {
        const books = this.props.list;
        return (
            <div className="book-list">
                {books.map((book, index) => (
                    <Book key={index} info={book} />
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
