import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as api from '../utils/BooksAPI';
import BookList from './BookList';
import Header from './Header';
import Search from './Search';
import sortBy from 'sort-by';

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
            const bookList = myBooks.sort(sortBy('title'));
            this.setState({myBooks: bookList});
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
                    <div>
                        <Link to="/search" id="nav"><span>Add Book &rarr;</span></Link>
                        <Header />
                        <div className="wrap">
                            <div className="book-shelf">

                                <h2 className="book-shelf__section">Currently Reading</h2>
                                <BookList
                                    books={currentBooks}
                                    handleBookChange={this.updateBook} />

                                <h2 className="book-shelf__section">Want to Read</h2>
                                <BookList
                                    books={futureBooks}
                                    handleBookChange={this.updateBook} />

                                <h2 className="book-shelf__section">Have Read</h2>
                                <BookList
                                    books={pastBooks}
                                    handleBookChange={this.updateBook} />
                            </div>
                        </div>
                    </div>
                )} />
                <Route path="/search" render={() => (
                    <Search
                        shelfData={books}
                        handleBookChange={this.updateBook} />
                )} />
                <Route path="/" render={() => (
                    <p style={{textAlign:'center'}}>Built from scratch, by <a rel="noopener noreferrer" href="https://twitter.com/cjkoepke" target="_blank">@cjkoepke</a></p>
                )} />
            </div>
        );
    }
}

export default App;
