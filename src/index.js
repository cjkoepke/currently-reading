import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './css/normalize.css';
import './css/theme.css';
import App from './comps/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Inject onTouch tap event for onClick methods.
injectTapEventPlugin();

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
