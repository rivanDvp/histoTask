import { getProviders } from "next-auth/react"

export const authStateActionsTypes = {
    GET_ALL_PROVIDERS_STARTED:'GET_ALL_PROVIDERS_STARTED',
    GET_ALL_PROVIDERS_SUCCESS:'GET_ALL_PROVIDERS_SUCCESS',
    GET_ALL_PROVIDERS_FAILED:'GET_ALL_PROVIDERS_FAILED',
    SET_THE_CURRENT_STATUS:'SET_THE_CURRENT_STATUS'
}

export const tryToGetProviders=()=>{
    return (dispatch)=>{
        dispatch(getAllProvidersStarted())
        getProviders()
        .then(providers=>dispatch(getAllProvidersSuccess(providers)))
        .catch(error=>dispatch(getAllProvidersFailed(error)))
    }
}
export const getAllProvidersStarted=()=>({
    type:authStateActionsTypes.GET_ALL_PROVIDERS_STARTED
})

export const getAllProvidersSuccess=(providers)=>({
    type:authStateActionsTypes.GET_ALL_PROVIDERS_SUCCESS,
    payload:providers
})

export const getAllProvidersFailed=(error)=>({
    type:authStateActionsTypes.GET_ALL_PROVIDERS_FAILED,
    payload:error
})

export const setTheCurrentStatus=(status,session)=>({
    type:authStateActionsTypes.SET_THE_CURRENT_STATUS,
    payload:{
        status,
        session
    }
})