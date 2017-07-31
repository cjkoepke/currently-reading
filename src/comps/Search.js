import React, { Component } from 'react';
import PropType from 'prop-types';
import BookList from './BookList';
import * as api from '../utils/BooksAPI';
import { Link } from 'react-router-dom';
import _debounce from 'debounce';

const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : searchTerms.filter(word =>
    word.toLowerCase().slice(0, inputLength) === inputValue
  );
};

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            books: [],
            error: false,
            suggestions: []
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
        this.setState({
            query: query,
            suggestions: getSuggestions(query)
        });

        // Debounce the BookList update to avoid overload.
        query &&
            this.updateResults(query);

        // Reset books if search query is empty.
        !query &&
            this.setState({
                books: [],
                error: false
            });
    }

    updateResults = (query) => {
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
        , 500);
    }

    handleAutoSuggest = (e) => {
        const value = e.target.textContent;
        this.updateInput(value);
        this.updateResults(value);
        this.setState({
            query: value,
            suggestions: []
        });
    }

    updateInput = (val) => this.searchInput.value = val;

    render() {
            /**
             * Discrepency in search results here. The first call returns
             * a shelf property of "wantToRead" for the book id of the second call.
             * The second call returns a shelf property of "none". I sanatize the
             * results to the bookshelf, or .getAll(), method.
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
                    <div className="search-wrap__query__suggestions">
                        <ul>
                            {this.state.suggestions && (
                                this.state.suggestions.map(sugg => (
                                    <li onClick={this.handleAutoSuggest} key={sugg}>{sugg}</li>
                                ))
                            )}
                        </ul>
                    </div>
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
