import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import registerReducer from './reducers/register';
import loginReducer from './reducers/login';
import passwordsReducer from './reducers/passwords'
import formsReducer from './reducers/forms'

const combinedReducers = combineReducers({
    registerReducer,loginReducer,passwordsReducer,formsReducer
});

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;



