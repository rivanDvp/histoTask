import { taskManagerActionsTypes } from "./actions"

const messageInitialState = {
    pending: false,
    message: '',
    type: 'info'//info||error
}
const TasksManagerInitialState = {
    tasks: [],
    loading: false,
    message: messageInitialState,
    filter: {
        show: false,
        category: '',
        query: []
    }
}

export default (state = TasksManagerInitialState, { type, payload }) => {
    switch (type) {
        case taskManagerActionsTypes.GET_ALL_TASKS_STARTED:
            return Object.assign({}, state, { loading: true });
        case taskManagerActionsTypes.GET_ALL_TASKS_SUCCESS:
            return Object.assign({}, state, { tasks: payload, loading: false });
        case taskManagerActionsTypes.GET_ALL_TASKS_FILED:
            //alert(`No se ha podido descaragar las tareas. Detalles:${payload}`)
            return Object.assign({}, state, { loading: false });
        case taskManagerActionsTypes.DELETE_TASK_STARTED:
            return Object.assign({}, state, { loading: true })
        case taskManagerActionsTypes.DELETE_TASK_SUCCESS:
            let deteleSuccessMessage = {
                pending: true,
                message: payload.message,
                type: 'info'
            }
            return Object.assign({}, state, { message: deteleSuccessMessage, loading: false })
        case taskManagerActionsTypes.DELETE_TASK_FAILED:
            let deteleFailedMessage = {
                pending: true,
                message: `Ha ocurrido un error. ${payload.error}`,
                type: 'error'
            }
            return Object.assign({}, state, { message: deteleFailedMessage, loading: false })
        case taskManagerActionsTypes.THERE_IS_NOT_PENDING_MESSAGE_MANAGER:
            return Object.assign({}, state, { message: messageInitialState })
        case taskManagerActionsTypes.TASK_MANAGER_SEND_MESSAGE:
            return Object.assign({}, state, { message: payload })
        case taskManagerActionsTypes.OPEN_TAGS_FILTER:
            let filterAfterOpen = Object.assign({}, state.filter, { show: true })
            return Object.assign({}, state, { filter: filterAfterOpen })
        case taskManagerActionsTypes.CLOSE_TAGS_FILTER:
            let filterAfterClose = Object.assign({}, state.filter, { show: false })
            return Object.assign({}, state, { filter: filterAfterClose })
        case taskManagerActionsTypes.SELECT_FILTER_CATEGORY:
            let filterSelect = Object.assign({}, state.filter, { category: payload })
            return Object.assign({}, state, { filter: filterSelect })
        case taskManagerActionsTypes.ADD_TAG_TO_QUERY:
            //avoid repet
            let tagIndex = state.filter.query.indexOf(payload)
            if (tagIndex !== -1) {
                return state
            }
            let queryAfterAdd = [...state.filter.query, payload]
            let filterAfterAdd = Object.assign({}, state.filter, { query: queryAfterAdd })
            return Object.assign({}, state, { filter: filterAfterAdd })
        case taskManagerActionsTypes.DELETE_TAG_FROM_QUERY:
            let queryAfterDelete = state.filter.query.filter(tag => tag !== payload);
            let filterAfterDelete = Object.assign({}, state.filter, { query: queryAfterDelete })
            return Object.assign({}, state, { filter: filterAfterDelete })
        case taskManagerActionsTypes.QUERY_SEARCH_STARTED:
            return Object.assign({}, state, { loading: true })
        case taskManagerActionsTypes.QUERY_SEARCH_SUCCESS:

            return Object.assign({}, state, { tasks: payload, loading: false });
        case taskManagerActionsTypes.QUERY_SEARCH_FAILED:
            let queryFailedMessage = {
                pending: true,
                message: `Ha ocurrido un error. ${payload}`,
                type: 'error'
            }
            return Object.assign({}, state, { message: queryFailedMessage, loading: false })
        case taskManagerActionsTypes.CLEAN_QUERY:
            let filterAfterClean=Object.assign({},state.filter,{query:[],category:''});
            return Object.assign({},state,{filter:filterAfterClean})
        default:
            return state
    }
}