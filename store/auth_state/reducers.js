import { authStateActionsTypes } from "./actions";

const authInitialState={
    providers:{

    },
    loading:false,
    status:"unauthenticated",
    session:{}
}

export default (state=authInitialState,{type,payload})=>{
    switch(type){
        case authStateActionsTypes.GET_ALL_PROVIDERS_STARTED:
            return Object.assign({},state,{loading:true})
        case authStateActionsTypes.GET_ALL_PROVIDERS_SUCCESS:
            return Object.assign({},state,{providers:payload,loading:false})
        case authStateActionsTypes.GET_ALL_PROVIDERS_FAILED:
            console.error(`Ha ocurrido un error al tratar de conseguir los "providers", detallle: ${payload} `)
            return Object.assign({},state,{loading:false})
        case authStateActionsTypes.SET_THE_CURRENT_STATUS:
            return Object.assign({},state,{status:payload.status,session:payload.session})



            
        default:
            return state
    }
}