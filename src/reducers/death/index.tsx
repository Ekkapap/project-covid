import { combineReducers } from 'redux';
import covid from './covid';
import excessmortality from './excessmortality';

export default combineReducers({
  covid,
  excessmortality,
});
