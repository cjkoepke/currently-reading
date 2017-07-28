import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as api from '../utils/BooksAPI';
import BookList from './BookList';
import Header from './Header';
import Search from './Search';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myBooks: []
        };
    }

    componentDidMount() {
        this.updateBooks();
    }

    updateBooks = () => {
        api.getAll().then(myBooks => {
            this.setState({myBooks});
        });
    }

    updateBook = (book, shelf) => {
        api.update(book, shelf)
            .then(() => { this.updateBooks() });
    }

    render() {
        const books = this.state.myBooks;
        const currentBooks = books.filter(book => book.shelf === 'currentlyReading');
        const futureBooks = books.filter(book => book.shelf === 'wantToRead');
        const pastBooks = books.filter(book => book.shelf === 'read');

        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <div className="wrap">
                        <div className="book-shelf">
                            <Header />

                            <h4>Currently Reading</h4>
                            <BookList
                                books={currentBooks}
                                handleBookChange={this.updateBook} />

                            <h4>Want to Read</h4>
                            <BookList
                                books={futureBooks}
                                handleBookChange={this.updateBook} />

                            <h4>Have Read</h4>
                            <BookList
                                books={pastBooks}
                                handleBookChange={this.updateBook} />

                            <Link to="/search" id="nav">Add Book</Link>
                        </div>
                    </div>
                )} />
                <Route path="/search" render={() => (
                    <Search
                        shelfData={books}
                        handleBookChange={this.updateBook} />
                )} />
            </div>
        );
    }
}

export default App;
