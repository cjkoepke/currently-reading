import React, { Component } from 'react';
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

                        this.setState({
                            books: books,
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
                <Link id="nav" to="/">Back to Home</Link>
            </div>
        )
    }
}

export default Search;
