import { createStore, applyMiddleware, combineReducers } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

import thunk from 'redux-thunk'
import Inhibit_unauthorized_actions from './my_middleware/Inhibit_unauthorized_actions'
import supervise_write_in_form from './my_middleware/supervise_write_in_form'
import task_in_edition from "./task_in_edition/reducers"
import task_manager from './task_manager/reducers'
import tags_editor from './tags_editor/reducers'
import auth_state from "./auth_state/reducers"


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
  }
  

const combinedReducer = combineReducers({
    task_in_edition,
    task_manager,
    tags_editor,
    auth_state
})

const reducer = (state, { type, payload }) => {
    if (type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...payload, // apply delta from hydration
        }
        //if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
        return nextState
    } else {
        return combinedReducer(state, {type,payload})
    }
}
//initStore is makeStore funtion
const initStore = () => {
    return createStore(reducer,bindMiddleware([
        thunk,
        Inhibit_unauthorized_actions,
        supervise_write_in_form
    ]))
    }

export const wrapper = createWrapper(initStore)