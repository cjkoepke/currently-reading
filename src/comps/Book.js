import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelf: this.props.book.shelf
        };
    }

    handleShelfUpdate = (e) => {
        this.setState({
            shelf: e.target.value
        });
        this.props.handleUpdate(this.props.book, e.target.value);
    }

    render() {
        const book = this.props.book;

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
                <select onChange={this.handleShelfUpdate} value={this.state.shelf} className="book-location-picker">
                    <option disabled label="Choose a Shelf:" />
                    <option value="wantToRead">Want to Read</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="read">Have Read</option>
                    <option value="none">None</option>
                </select>
            </li>
        )
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired
}

export default Book;
