import {applyMiddleware, combineReducers, createStore} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { AdminReducer } from './reducer/AdminReducer'
import { LoadingReducer } from './reducer/LoadingReducer'
import { LoginReducer } from './reducer/LoginReducer'
import { ModalReducer } from './reducer/ModalReducer'
import { rootSaga } from './saga/rootSaga'


const sagaMiddleware = createSagaMiddleware()



const rootReducer = combineReducers({
    LoginReducer,
    LoadingReducer,
    AdminReducer,
    ModalReducer
})

export const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)