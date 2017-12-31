import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => state.main;
const mapDispatchToProps = dispatch => ({
    onLoginClick: (username, password) => {
        console.log("onLoginClick");
        return loginFetch(dispatch);
    }
});


const delay = ms => new Promise(success => setTimeout(success, ms));
const loginFetch = dispatch =>
        delay(1000).then(() =>
            dispatch({type: 'loginSuccess'}));
    
const LoginView = ({login, onLoginClick}) => {
    console.log("LoginView, login:", login);
    // const { from } = this.props.location.state || { from: { pathname: '/' } }
    if(login.isLoggedIn) {
        return <Redirect to={'/'}/>
    }
    return (
        <div>
          <p>You must log in.</p>
          <button onClick={onLoginClick}>Log in</button>
        </div>
    )
};

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);

export default Login