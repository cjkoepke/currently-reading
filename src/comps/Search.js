import React, { Component } from 'react';
import SearchForm from './SearchForm';
import BookList from './BookList';
import * as api from '../utils/BooksAPI';
import { Link } from 'react-router-dom';

class Search extends Component {
    state = {
        query: '',
        books: []
    }

    componentDidMount() {
        api.getAll().then(res => {
            this.setState((state) => ({
                books: state.books.concat(res)
            }))
        });
    }

    render() {
        return (
            <div className="search-page">
                <h2>Searching!</h2>
                <SearchForm/>
                <BookList list={this.state.books} />
                <Link id="nav" to="/">Back to Home</Link>
            </div>
        )
    }
}

export default Search;
