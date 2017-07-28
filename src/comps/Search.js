import React, { Component } from 'react';
import BookList from './BookList';
import * as api from '../utils/BooksAPI';
import { Link } from 'react-router-dom';
import _debounce from 'debounce';
import sortBy from 'sort-by';

class Search extends Component {
    state = {
        query: '',
        books: [],
        error: false
    }

    componentDidMount() {
        this.searchInput.focus();
    }

    handleChange = (e) => {
        const query = e.target.value;
        this.setState({query});

        // Debounce the BookList update.
        query &&
            _debounce(this.updateSearch(query), 500)

        // Reset books if search query is blank.
        !query &&
            this.setState({
                books: [],
                error: false
        });
    }

    updateSearch = (query) => {
        api.search(query, 10)
            .then(books => {
                if (!books.length) {
                    throw new Error( `The returned query was not an array: ${books.error}` );
                }
                this.setState({
                    books: books.sort(sortBy('title')),
                    error: false
                })
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true});
            });
    }

    render() {
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
                    {!this.state.query && (
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
