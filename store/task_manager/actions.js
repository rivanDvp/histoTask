export const taskManagerActionsTypes = {
    GET_ALL_TASKS_STARTED: 'GET_ALL_TASKS_STARTED',
    GET_ALL_TASKS_SUCCESS: 'GET_ALL_TASKS_SUCCESS',
    GET_ALL_TASKS_FILED: 'GET_ALL_TASKS_FILED',
    DELETE_TASK_STARTED: 'DELETE_TASK_STARTED',
    DELETE_TASK_SUCCESS: 'DELETE_TASK_SUCCESS',
    DELETE_TASK_FAILED: 'DELETE_TASK_FAILED',
    THERE_IS_NOT_PENDING_MESSAGE_MANAGER: 'THERE_IS_NOT_PENDING_MESSAGE',
    TASK_MANAGER_SEND_MESSAGE: 'TASK_MANAGER_SEND_MESSAGE',
    OPEN_TAGS_FILTER: 'OPEN_TAGS_FILTER',
    CLOSE_TAGS_FILTER: 'CLOSE_TAGS_FILTER',
    SELECT_FILTER_CATEGORY: 'SELECT_FILTER_CATEGORY',
    ADD_TAG_TO_QUERY: "ADD_TAG_TO_QUERY",
    DELETE_TAG_FROM_QUERY: 'DELETE_TAG_FROM_QUERY',
    QUERY_SEARCH_STARTED: 'QUERY_SEARCH_STARTED',
    QUERY_SEARCH_SUCCESS: 'QUERY_SEARCH_SUCCESS',
    QUERY_SEARCH_FAILED: 'QUERY_SEARCH_FAILED',
    CLEAN_QUERY:'CLEAN_QUERY',
}

export const tryToGetAllTasks = () => {
    return (dispatch) => {
        dispatch(getAllTasksStarted())

        try {
            fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/tasks')
            .then(res => {
                if (!res.ok){
                    throw Error(res.status);
                }
                return res.json()
            })
                .then(data => dispatch(getAllTasksSuccess(data)))
                .catch(error => dispatch(getAllTasksFiled(error)))
        } catch (error) {
            console.error(error)
        }


    }
}

export const getAllTasksStarted = () => ({
    type: taskManagerActionsTypes.GET_ALL_TASKS_STARTED
})

export const getAllTasksSuccess = (data) => ({
    type: taskManagerActionsTypes.GET_ALL_TASKS_SUCCESS,
    payload: data
})

export const getAllTasksFiled = (error) => ({
    type: taskManagerActionsTypes.GET_ALL_TASKS_FILED,
    payload: error
})

export const trytoDeleteTask = (_id) => {
    return (dispatch) => {
        dispatch(deleteTaskStarted())

        fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/tasks/' + _id, { method: 'DELETE' })
        .then(res => {
            if (!res.ok){
                throw Error(res.status);
            }
            return res.json()
        })
            .then(data => dispatch(deleteTaskSuccess(data)))
            .then(() => dispatch(tryToGetAllTasks()))
            .catch(error => dispatch(deleteTaskFailed(error)))
    }
}

export const deleteTaskStarted = () => ({
    type: taskManagerActionsTypes.DELETE_TASK_STARTED
})

export const deleteTaskSuccess = (data) => ({
    type: taskManagerActionsTypes.DELETE_TASK_SUCCESS,
    payload: data
})

export const deleteTaskFailed = (error) => ({
    type: taskManagerActionsTypes.DELETE_TASK_FAILED,
    payload: error
})

export const thereIsNotPendingMessageManager = () => ({
    type: taskManagerActionsTypes.THERE_IS_NOT_PENDING_MESSAGE_MANAGER
})

export const taskManagerSendMessage = (objMessage) => ({
    type: taskManagerActionsTypes.taskManagerSendMessage,
    payload: objMessage
})

export const openTagsFilter = () => ({
    type: taskManagerActionsTypes.OPEN_TAGS_FILTER
})

export const closetagsFilter = () => ({
    type: taskManagerActionsTypes.CLOSE_TAGS_FILTER
})

export const selectFilterCategory = (category) => ({
    type: taskManagerActionsTypes.SELECT_FILTER_CATEGORY,
    payload: category
})

export const addTagToQuery = (tag) => ({
    type: taskManagerActionsTypes.ADD_TAG_TO_QUERY,
    payload: tag

})

export const deleteTagFromQuery = (tag) => ({
    type: taskManagerActionsTypes.DELETE_TAG_FROM_QUERY,
    payload: tag
})


export const tryToQuerySearch = () => {
    return (dispatch, getState) => {
       
        let email = getState().auth_state.session.user.email;
        let query = getState().task_manager.filter.query;
        if(query.length===0){
            return null
        }
        dispatch(getAllTasksStarted())
        fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/tasks',
        {
            method:'POST',
            body:JSON.stringify({email,query}),
            headers:{
                'content-type':'application/json'
            }
        })
            .then(res => {
                if (!res.ok){
                    throw Error(res.status);
                }
                return res.json()
            })
            .then(data => dispatch(querySearchSuccess(data)))
            .catch(error => dispatch(querySearchFailed(error)))

    }
}


export const querySearchStarted = () => ({
    type: taskManagerActionsTypes.QUERY_SEARCH_STARTED
})

export const querySearchSuccess = (data) => ({
    type: taskManagerActionsTypes.QUERY_SEARCH_SUCCESS,
    payload: data
})

export const querySearchFailed = (error) => ({
    type: taskManagerActionsTypes.QUERY_SEARCH_FAILED,
    payload: error

})

export const tryToCleanQuery=()=>{
    return (dispatch)=>{
        dispatch(cleanQuery())
        dispatch(tryToGetAllTasks())
    }
}

export const cleanQuery=()=>({
    type:taskManagerActionsTypes.CLEAN_QUERY
})