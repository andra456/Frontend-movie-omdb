import { combineReducers } from 'redux';
import prodReducer from './movies';

export const rootReducer = combineReducers({
    content    : prodReducer
});


export default rootReducer;
