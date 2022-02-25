import { MainType } from "../constant/MainType/MainType";


const stateDefaults = {
    loadingStatus:false
}

export const LoadingReducer = (state = stateDefaults,action) => {
    switch (action.type) {
        case MainType.OPEN_LOADING: {
            state.loadingStatus = true;
            return {...state};
        }
        case MainType.CLOSE_LOADING: {
            state.loadingStatus = false;
            return {...state};
        }
        default: {return {...state};}
    }
}