import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';
import BottomNavConnected from './BottomNav';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import reducers from './reducers'
// import Home from './Home'
import { composeWithDevTools } from 'redux-devtools-extension';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)
const Photo = () => (
  <div>
    <h2>Photo</h2>
  </div>
)

const Settings = () => (
  <div>
    <h2>Settings</h2>
  </div>
)

const history = createHistory()
const middleware = routerMiddleware(history)
const store = createStore(
  combineReducers({
    reducers,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware))
)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div width="100%" height="100%">
              <NavBar />
                <div>
                  <Route exact path="/" component={Home}/>
                  <Route path="/photo" component={Photo}/>
                  <Route path="/settings" component={Settings}/>
                </div>
              <BottomNavConnected/>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;



  