import React, { Component } from 'react';
import PropType from 'prop-types';
import BookList from './BookList';
import * as api from '../utils/BooksAPI';
import { Link } from 'react-router-dom';
import _debounce from 'debounce';
// import sortBy from 'sort-by';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            books: [],
            error: false
        }
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    validateBooks = (books) => {
        const shelfBooks = this.props.shelfData;

        const validateBooks = books.map(book => {

            book.shelf = 'none';

            shelfBooks.forEach(shelfBook => {
                if (book.id === shelfBook.id) {
                    book.shelf = shelfBook.shelf;
                }
            });

            return book;

        });

        return validateBooks;
    }

    handleChange = (e) => {

        // Immediately update input state.
        const query = e.target.value;
        this.setState({query});

        // Debounce the BookList update to avoid overload.
        query &&
            _debounce(
                api.search(query)
                    .then(books => {
                        if (!books.length) {
                            throw new Error( `The returned query was not an array: ${books.error}` );
                        }

                        // Validate response against book shelf data.
                        return this.validateBooks(books);
                    })
                    .then(validated => {
                        this.setState({
                            books: validated,
                            error: false
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({error: true});
                    })
            , 500)

        // Reset books if search query is empty.
        !query &&
            this.setState({
                books: [],
                error: false
            });
    }

    render() {
            /**
             * Discrepency in search results here. The first call returns
             * a shelf property of "wantToRead" for the book id of the second call.
             * The second call returns a shelf property of "none".
             */
            // api.search('finance').then(res => console.log(res));
            // api.get('74XNzF_al3MC').then(res => console.log(res));

        return (
            <div className="search-wrap">
                <Link id="nav" to="/"><span>&larr; Back to Home</span></Link>
                <div className="search-wrap__query">
                    <input
                        className="search-wrap__input"
                        type="text"
                        placeholder="Search here..."
                        value={this.state.query}
                        onChange={this.handleChange}
                        ref={input => { this.searchInput = input }} />
                </div>
                <div className="wrap">
                    {this.state.query === '' && (
                        <h4 className="book-grid__notice">Whatchya looking for?</h4>
                    )}
                    {!this.state.error && (
                        <BookList
                            books={this.state.books}
                            handleBookChange={this.props.handleBookChange} />
                    )}
                    {this.state.error && <h2 className="book-grid__notice">That doesn't match any results :(</h2>}
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    shelfData: PropType.array.isRequired,
    handleBookChange: PropType.func.isRequired
}

export default Search;
