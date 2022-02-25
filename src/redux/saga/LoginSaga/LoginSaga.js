import { call, delay, put, takeLatest } from "redux-saga/effects";
import { SagaType } from "../SagaType/SagaType";
import { LoginService } from "../../../service/LoginService/LoginService";
import { DelayTime } from "../../../util/DelayTime";
import { MainType } from "../../constant/MainType/MainType";
import { localSave } from "../../../util/localSave";
function* login(action) {
    try{
        const userLogin = {
            taiKhoan: action.userLogin.username,
            matKhau: action.userLogin.password
        }   
        const {data, status} = yield call(() => (LoginService.loginAPI(userLogin)))
        yield put({
            type:MainType.OPEN_LOADING,
        })
        yield delay(DelayTime.loginTime)
        
        if(status == 200){
          
            localStorage.setItem(localSave.token,data.content.accessToken)
            localStorage.setItem(localSave.userLogin,JSON.stringify(data.content))
            yield put({
                type:MainType.LOGIN_FAIL,
                failType:false
            })
            action.navigate('../admin')
        }
        yield put({
            type:MainType.CLOSE_LOADING,
        })
    }catch(err){
        yield put({
            type:MainType.OPEN_LOADING,
        })
        yield delay(DelayTime.loginTime)
        yield put({
            type:MainType.LOGIN_FAIL,
            failType: true
        })
        yield put({
            type:MainType.CLOSE_LOADING,
        })
    }
}

export function* TrackingLogin(){
    yield takeLatest(SagaType.LOGIN_SAGA,login)
}