import React from 'react';
import SearchForm from './SearchForm';

const Header = (props) => (
    <header className="app-header">
        <h1 className="app-header__title">MyReads</h1>
        <SearchForm/>
    </header>
)

export default Header;

