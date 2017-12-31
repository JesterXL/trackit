import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';
import BottomNavConnected from './BottomNav';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { Redirect } from 'react-router-dom'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import {main} from './reducers'
// import Home from './Home'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import Login from './Login';
import { connect } from 'react-redux';

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
    main,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, thunkMiddleware))
)

const mapStateToProps = state => state.main;
const mapDispatchToProps = dispatch => ({});
const PrivateRouteComponent = ({ component: Component, ...rest }) =>
{
  const {login} = rest;
  return (
  <Route {...rest} render={props => (
    login.isLoggedIn ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)};

const PrivateRoute = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivateRouteComponent);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div width="100%" height="100%">
              <NavBar />
                <div>
                  <PrivateRoute exact path="/" component={Home}/>
                  <PrivateRoute path="/photo" component={Photo}/>
                  <PrivateRoute path="/settings" component={Settings}/>
                  <Route path="/login" component={Login}/>
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



  