import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import * as Resizers from './context/ResizerContext';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Init history
const history = createBrowserHistory();

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    // createReducers(history),
    applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Router>
                <Route path="/" component={App} />
            </Router>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
