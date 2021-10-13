import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducers = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
