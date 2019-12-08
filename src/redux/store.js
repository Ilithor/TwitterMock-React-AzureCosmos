import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

//handler for react's hot reloading
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

/**make the store a singleton
 * @type {import('redux').Store & {dispatch}}
 */
let store;
/** Initialize the redux store
 *
 * @type {Function}
 */
const configureStore = () => {
  store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(...middleware),
      composeEnhancers()
    )
  );
};

//singleton pattern
if (!store) {
  configureStore();
}

/** Initialize instance of the redux store.
 */
export default store;
