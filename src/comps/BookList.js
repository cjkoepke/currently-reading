import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import * as api from '../utils/BooksAPI';

class BookList extends Component {
    render() {
        const books = this.props.books;
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
    books: []
}

BookList.propTypes = {
    books: PropTypes.array.isRequired
}

export default BookList;
