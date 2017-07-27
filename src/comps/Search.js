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

    handleChange = (e) => {
        const query = e.target.value;
        this.setState({query});

        // Debounce the BookList update.
        query &&
            _debounce(this.updateSearch(query), 500);

        query === ''
            this.setState({books: []});
    }

    updateSearch = (query) => {
        api.search(query, 10)
            .then(books => {
                if (Array.isArray(books)) {
                    books.sort(sortBy('title'));
                    this.setState({
                        books: books
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({error: true});
            });
    }

    render() {
        return (
            <div className="search-page">
                <h2>Searching!</h2>
                <input
                    className="search-page__query"
                    type="text"
                    placeholder="Search here..."
                    value={this.state.query}
                    onChange={this.handleChange} />
                {!this.state.error && (
                    <BookList books={this.state.books} />
                )}
                {this.state.error && <h2>Something went wrong!</h2>}
                <Link id="nav" to="/">Back to Home</Link>
            </div>
        )
    }
}

export default Search;
