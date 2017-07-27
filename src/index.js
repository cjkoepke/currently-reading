import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Inject onTouch tap event for onClick methods.
injectTapEventPlugin();

ReactDOM.render(<App />, document.getElementById('root'));
