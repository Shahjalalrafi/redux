const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware
const logger = reduxLogger.createLogger()

// ACTION
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAME = 'BUY_ICECREAME'

function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'first redux action'
    }
}

function buyIcecreame() {
    return {
        type: BUY_ICECREAME,
        info: 'first redux action for iceCreame'
    }
}


// REDUCER


const initialCakes = {
    numOfCakes: 10
}

const initialIcecreame = {
    numOfIcecreame: 20
}

const cakeReducer = (state = initialCakes, action) => {
    switch(action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes -1
            }
        default : return state 
    }
}

const iceCreameReducer = (state = initialIcecreame, action) => {
    switch(action.type) {
        case BUY_ICECREAME:
            return {
                ...state,
                numOfIcecreame: state.numOfIcecreame -1
            }
        default : return state 
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreameReducer
})

const store = createStore(rootReducer, applyMiddleWare(logger))

console.log('initial iceCreame state', store.getState())
const unsubscribe = store.subscribe(() => {})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIcecreame())
store.dispatch(buyIcecreame())
store.dispatch(buyIcecreame())

unsubscribe()