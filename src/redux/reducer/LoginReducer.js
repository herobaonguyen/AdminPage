import { MainType } from "../constant/MainType/MainType"


const stateDefault = {
    navigate: () => {},
    loginFail: false,
}

export const LoginReducer = (state = stateDefault,action) => {
    switch (action.type) {

        case 'SEND_NAVIGATE':{
            state.navigate = action.navigate
           return {...state}
        }

        case MainType.LOGIN_FAIL:{
            state.loginFail = action.failType
            return {...state}
        }

        default: return {...state}
    }
}