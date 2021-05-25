const redux = require('redux')

const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS"
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR"


const fetchUserRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUserError = (error) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case fetchUserRequest:
            return {
                ...state,
                loading: true
            }

        case fetchUserSuccess:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }

        case fetchUserError:
            return {
                loading: false,
                users: [],
                error: action.payload
            }

        default: state
    }
}


const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                const users = res.data.map(user => user.id)
                dispatch(fetchUserSuccess(users))
            })
            .catch(err => {
                dispatch(fetchUserError(err.message))
            })
    }
}

const store = createStore(reducer, applyMiddleWare(thunkMiddleWare))

// store.subscribe(() => console.log(store.getState()))
store.subscribe(() => {console.log(store.getState())})
store.dispatch(fetchUsers())