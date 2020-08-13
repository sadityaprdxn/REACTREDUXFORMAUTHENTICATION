import React  from 'react';
import '../scss/App.scss';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Form from './Form';
import Profile from './Profile';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { userReducer } from '../redux/reducers/userReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const store = createStore(userReducer, devToolsEnhancer() );

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Route path='/' exact>
          <Form />
        </Route>
        <Route path='/user/:id' exact>
          <Profile />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
