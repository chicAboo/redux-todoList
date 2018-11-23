import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducerList from './reducer';
import mySaga from '../sagas/saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware),
);

const store = createStore(
    reducerList,
    enhancer
);

sagaMiddleware.run(mySaga);

export default store;