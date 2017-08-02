import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import sortBy from 'sort-by';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            bookOrder: 'az',
            mature: true
        }
    }

    componentDidMount() {
        this.setState({
            books: this.props.books
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            books: nextProps.books
        });
    }

    handleOrder = (e) => {
        const books = this.state.books;
        const order = e.target.value;
        let sorted;

        switch(order) {
            case 'az':
                sorted = books.sort(sortBy('title'));
                break;

            case 'za':
                sorted = books.sort(sortBy('title')).reverse();
                break;

            case 'publishedDate':
                let newBooks = books.map(book => {
                    const formated = book.publishedDate.split('-').map(date => parseInt(date, 10));
                    book.formattedDate = Date.UTC(...formated);
                    return book;
                });
                sorted = newBooks.sort(sortBy('formattedDate'));
                break;

            default:
                sorted = books;
                break;
        }

        this.setState({
            books: sorted,
            bookOrder: order
        });
    }

    handleMature = () => {
        this.setState((prevState, props) => {
            if (!prevState.mature) {
                return {
                    books: props.books,
                    mature: true
                }
            }

            return {
                books: prevState.books.filter(book => book.maturityRating !== 'MATURE'),
                mature: false
            }
        });
    }

    render() {
        const books = this.state.books;
        return (
            <ul className="book-grid">
                {books.length > 0 && (
                    <li className="book-grid__filter">
                        <div className="book-card">
                            <ul>
                                <li>
                                    <label>Sort Books: </label>
                                    <select value={this.state.bookOrder} onChange={this.handleOrder}>
                                        <option value="az">A to Z</option>
                                        <option value="za">Z to A</option>
                                        <option value="publishedDate">Published Date</option>
                                    </select>

                                    <label>Show Mature?</label>
                                    <input onChange={this.handleMature} checked={this.state.mature} type="checkbox" />
                                </li>
                            </ul>
                        </div>
                    </li>
                )}
                {books.map((book, index) => (
                        <Book
                            key={book.id + index}
                            handleUpdate={this.props.handleBookChange}
                            book={book} />
                ))}
            </ul>
        )
    }
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    handleBookChange: PropTypes.func.isRequired
}

export default BookList;
