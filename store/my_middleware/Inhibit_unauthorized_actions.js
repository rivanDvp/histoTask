import { authStateActionsTypes } from "../auth_state/actions";
export default store => next => action => {
    let status = store.getState().auth_state.status;
//    console.log({ status })
    if (action.type === authStateActionsTypes.GET_ALL_PROVIDERS_STARTED
        ||action.type === authStateActionsTypes.GET_ALL_PROVIDERS_SUCCESS
        ||action.type === authStateActionsTypes.GET_ALL_PROVIDERS_FAILED) {
        return next(action)

    }else if (action.type === authStateActionsTypes.SET_THE_CURRENT_STATUS) {
        next(action)
    }else if (status === 'unauthenticated') {
        next({
            type: "null"
        })
    }
     else {
        return next(action)

    }
}