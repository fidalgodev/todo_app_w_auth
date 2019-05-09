import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import todosReducer from './todosReducer';

export default combineReducers({
  auth: authReducer,
  todos: todosReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});
