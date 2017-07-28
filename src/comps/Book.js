import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookShelfPicker from './BookShelfPicker';

class Book extends Component {
    state = {
        info: this.props.info
    }

    render() {
        const info = this.state.info;

        return (
            <div className="book-card">
                {info.imageLinks && (
                    <img className="book-card__image" src={info.imageLinks.thumbnail} alt={info.title} />
                )}
                {info.title && <h4 className="book-card__title">{info.title}</h4>}
                {info.authors && (
                    <div className="book-card__authors">
                        {info.authors.map((author, index) => (
                            <span key={index}>
                                {author}
                                {index !== (info.authors.length - 1) && ', '}
                            </span>
                        ))}
                    </div>
                )}
                <BookShelfPicker handleUpdate={this.props.handleUpdate} book={info} />
            </div>
        )
    }
};

Book.propTypes = {
    info: PropTypes.object.isRequired
}

export default Book;
