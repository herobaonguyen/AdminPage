import { all} from 'redux-saga/effects';
import * as LoginSaga from './LoginSaga/LoginSaga'


export function* rootSaga(){
    yield all([
        LoginSaga.TrackingLogin()
    ])
}