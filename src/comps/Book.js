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
                {book.maturityRating === 'MATURE' && (
                    <span className="book-card__mature">Mature</span>
                )}
                {book.title && <h4 className="book-card__title">{book.title}</h4>}
                {book.authors && (
                    <div className="book-card__authors">
                        <p>
                            {book.authors.map((author, index) => (
                                <span key={index}>
                                    {author}
                                    {index !== (book.authors.length - 1) && ', '}
                                </span>
                            ))}
                        </p>
                    </div>
                )}
                {book.publishedDate && (
                    <p><small>
                        <strong>Published: {book.publishedDate}</strong>
                    </small></p>
                )}
                <select onChange={this.handleShelfUpdate} value={this.state.shelf} className="book-card__location">
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
