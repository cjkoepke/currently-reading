import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom';
import Header from './Header';
import CurrentReads from './CurrentReads';
import FutureReads from './FutureReads';
import PastReads from './PastReads';
import Search from './Search';

class App extends Component {
    state = {
        currentReads: [],
        pastReads: [],
        futureReads: []
    }

    render() {
        return (
            <div className="App">
                <Route exact path="/" render={() => (
                    <div className="wrap">
                        <div className="book-shelf">
                            <Header />
                            <CurrentReads />
                            <PastReads />
                            <FutureReads />
                            <Link to="/search" id="nav">Add Book</Link>
                        </div>
                    </div>
                )} />
                <Route path="/search" component={Search} />
            </div>
        );
    }
}

App.propTypes = {
    currentReads: PropTypes.array,
    pastReads: PropTypes.array,
    futureReads: PropTypes.array
}

export default App;
