import React from 'react';
import PropTypes from 'prop-types';
import BookShelfPicker from './BookShelfPicker';

const Book = (props) => {
    const book = props.book;

    return (
        <li className="book-card">
            {book.imageLinks && (
                <img className="book-card__image" src={book.imageLinks.thumbnail} alt={book.title} />
            )}
            {book.title && <h4 className="book-card__title">{book.title}</h4>}
            {book.authors && (
                <div className="book-card__authors">
                    {book.authors.map((author, index) => (
                        <span key={index}>
                            {author}
                            {index !== (book.authors.length - 1) && ', '}
                        </span>
                    ))}
                </div>
            )}
            <BookShelfPicker handleUpdate={props.handleUpdate} book={book} />
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired
}

export default Book;
