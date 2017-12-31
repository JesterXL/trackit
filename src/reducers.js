import fetch from 'cross-fetch';

const defaultState = {
    login: {
        isLoggedIn: false,
        user: undefined,
        loggingIn: false
    }
};

const onLogin = (state, action) => Object.assign({}, state, {
    login: {
        loggingIn: true,
        isLoggedIn: false,
        user: undefined
    }
});

const onLoginSuccess = (state, action) => Object.assign({}, state, {
    login: {
        loggingIn: false,
        isLoggedIn: true,
        user: action.user
    }
});

const onLoginFailure = (state, action) => Object.assign({}, state, {
    login: {
        loggingIn: true,
        isLoggedIn: false,
        user: undefined
    }
});

export const main = (state = defaultState, action) => {
    console.log("main:", state, action);
    switch(action.type) {
        case 'login': return onLogin(state, action);
        case 'loginSuccess': return onLoginSuccess(state, action);
        case 'loginFailure': return onLoginFailure(state, action);
        default: return state;
    }
};
