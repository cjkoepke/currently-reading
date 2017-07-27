import React from 'react';
import PropTypes from 'prop-types';

const Book = (props) => {
    const info = props.info;
    return (
        <div className="book-card">
            <img className="book-card__image" src={info.imageLinks.thumbnail} alt={info.title} />
            <h4 className="book-card__title">{info.title}</h4>
            <div className="book-card__authors">
                {info.authors.map((author, index) => {
                    return (
                        <span>
                            {author}
                            {index !== (info.authors.length - 1) && ', '}
                        </span>
                    )
                })}
            </div>
        </div>
    )
};

Book.propTypes = {
    info: PropTypes.object.isRequired
}

export default Book;
