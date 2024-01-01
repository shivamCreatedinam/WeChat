import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import ApiMiddleware from '../../apimanager/ApiMiddleware'
import rootReducer from '../reducers/RootReducer'

const Store = createStore(
  rootReducer,
  {},
  applyMiddleware(thunk, ApiMiddleware)
);

export default Store;
