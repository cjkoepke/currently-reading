import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
    state = {
        books: this.props.books,
    }

    render() {
        const books = this.props.books;
        return (
            <div className="book-grid">
                {books.length > 0 && (
                    books.map((book, index) => (
                        <Book
                            key={index}
                            handleUpdate={this.props.handleBookChange}
                            info={book} />
                    ))
                )}
            </div>
        )
    }
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    handleBookChange: PropTypes.func.isRequired
}

export default BookList;
