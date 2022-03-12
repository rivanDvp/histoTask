import { taskEditionActionsTypes } from "./actions";
import swapElements from "../../auxiliarJS/swapElements";
import renumber from "../../auxiliarJS/renumber";
const subtask_status = {
    NOT_STARTED: 'NOT_STARTED',
    STARTED: 'STARTED',
    PAUSED: 'PAUSED',
    FINISHED: 'FINISHED'

}
const subtaskTemplate = {
    id: 1,
    name: '',
    description: '',
    status: subtask_status.NOT_STARTED,
    start_dates: [],
    pause_dates: [],
    finish_date: 0
}
let messageInitialState = {
    pending: false,
    message: '',
    type: 'info'//info||error
}

let tagsSelectorInitialState={
    show:false,
    category:''
}
const newTaskInitialState = {
    _id: undefined,//this will be provided by mongoDB
    task_name: "Nueva Tarea",
    subtasks: [subtaskTemplate],
    run: {
        ...subtaskTemplate,
        id: 0
    },
    timer: {
        id: 0,
        last_update: 0
    },
    loading: false,
    message: messageInitialState,
    tags: [],
    tags_selector: tagsSelectorInitialState

}


export default (state = newTaskInitialState, { type, payload }) => {
    switch (type) {

        case taskEditionActionsTypes.ADD_SUBTASK:
            if (state.subtasks.length >= 10) { return state }
            let ids = state.subtasks.map(st => st.id)
            let newId = Math.max(...ids) + 1;
            let newSubtask = {
                ...subtaskTemplate,
                id: newId

            }
            let newSubtasks = [...state.subtasks, newSubtask]
            return Object.assign({}, state, { subtasks: newSubtasks })
        case taskEditionActionsTypes.DELETE_SUBTASK:
            if (state.subtasks.length === 1) { return state }
            let idToDelete = payload
            newSubtasks = renumber(state.subtasks.filter(({ id }) => id !== idToDelete))
            return Object.assign({}, state, {
                subtasks: newSubtasks,
                run: {
                    ...subtaskTemplate,
                    id: 0
                }
            })
        case taskEditionActionsTypes.CHANGE_DESCRIPTION_SUBTASK:
            let { id, description } = payload;
            let indexToEdit = state.subtasks.map((st) => st.id === id).indexOf(true)
            let subtaskEdited = state.subtasks.map((st, index) => {
                if (index === indexToEdit) {
                    return Object.assign({}, st, { id, description })
                } else {
                    return st
                }
            })
            return Object.assign({}, state, { subtasks: subtaskEdited })
        case taskEditionActionsTypes.CHANGE_TASK_NAME:
            return Object.assign({}, state, { task_name: payload })
        case taskEditionActionsTypes.CHANGE_SUBTASK_NAME:
            //let subtaskToChangeName=payload;
            let indexToEditName = state.subtasks.map((st) => st.id === payload.id).indexOf(true)
            let subtasksEditedName = state.subtasks.map((st, index) => {
                if (index === indexToEditName) {
                    return Object.assign({}, st, payload)
                } else {
                    return st
                }
            })

            if(payload.id===state.run.id){
                let runAfterRenameSubtask=Object.assign({},state.run,{name:payload.name})
                return Object.assign({}, state, { subtasks: subtasksEditedName,run:runAfterRenameSubtask })
            }else{
                return Object.assign({}, state, { subtasks: subtasksEditedName })
            }
            
        case taskEditionActionsTypes.SELECT_SUBTASK_TO_RUN:
            let subtaskSelectedToRun = state.subtasks.filter(st => st.id === payload)[0];
            return Object.assign({}, state, { run: subtaskSelectedToRun })
        case taskEditionActionsTypes.RUN_SUBTASK:
            //find if some subtask is already running...
            let subtaskCurrentlyRunning = state.subtasks.filter(st => st.status === subtask_status.STARTED)
            if (subtaskCurrentlyRunning.length !== 0) {
                let aTaskIsRunningMessage = {
                    pending: true,
                    message: `Actualmente se esta controlando la ejecución de:
                    - Tarea: ${state.task_name}
                    - Subtarea: ${subtaskCurrentlyRunning[0].name}
                    - Id: ${subtaskCurrentlyRunning[0].id}
                    \nDebe pausar o finalizar la actual subtarea para ejecutar otra`,
                    type: "info"
                }
                return Object.assign({}, state, { message: aTaskIsRunningMessage })
            } else if (payload.id === 0) {//subtask with id=0 must not exist
                return state
            }

            let runAfterStart = {
                ...state.run,
                status: subtask_status.STARTED,
                start_dates: [...state.run.start_dates, payload.start_date]
            };
            let subtaskAfterRun = state.subtasks.map(st => {
                if (st.id === payload.id) {
                    return Object.assign({}, st, runAfterStart)
                } else {
                    return st
                }
            })
            return Object.assign({}, state, { run: runAfterStart, subtasks: subtaskAfterRun },
                { timer: { ...state.timer, id: payload.timerID } })
        case taskEditionActionsTypes.PAUSE_SUBTASK:
            if (state.run.status === subtask_status.PAUSED) {
                //alert(`Actualmente la tarea ya esta "pausada"`)
                let pauseMessage = {
                    pending: true,
                    message: 'Actualmente la tarea ya esta "pausada"',
                    type: 'info'//info||error
                }
                return Object.assign({}, state, { message: pauseMessage })
            }
            let runAfterPause = {
                ...state.run,
                status: subtask_status.PAUSED,
                pause_dates: [...state.run.pause_dates, payload.pause_date]
            };

            let subtaskAfterPause = state.subtasks.map(st => {
                if (st.id === payload.id) {
                    return Object.assign({}, st, runAfterPause)
                } else {
                    return st
                }
            })
            return Object.assign({}, state, { run: runAfterPause, subtasks: subtaskAfterPause })

        case taskEditionActionsTypes.FINISH_SUBTASK:
            if (state.run.status !== subtask_status.STARTED) {
                //alert('Solo se puede finalizar una tarea que este en ejecución ("STARTED")')
                let finishMessage = {
                    pending: true,
                    message: 'Solo se puede finalizar una tarea que este en ejecución ("STARTED")',
                    type: 'info'//info||error
                }
                return Object.assign({}, state, { message: finishMessage })
            }
            let runAfterFinish = {
                ...state.run,
                status: subtask_status.FINISHED,
                finish_date: payload.finish_date
            };
            let subtaskAfterFinish = state.subtasks.map(st => {
                if (st.id === payload.id) {
                    return Object.assign({}, st, runAfterFinish)
                } else {
                    return st
                }
            })
            return Object.assign({}, state, { run: runAfterFinish, subtasks: subtaskAfterFinish })
        case taskEditionActionsTypes.UPDATE_TIMER:
            let updatedTimer = { ...state.timer, last_update: payload }
            return Object.assign({}, state, { timer: updatedTimer })
        case taskEditionActionsTypes.RETAKE_SUBTASK:
            if (state.run.status !== subtask_status.FINISHED) {
                return state
            }
            let subtasksAfterRetake = state.subtasks.map(st => {
                if (st.id === payload) {
                    let subtaskToRetake = {
                        status: subtask_status.PAUSED,
                        finish_date: 0,
                        pause_dates: [...st.pause_dates, st.finish_date]
                    }
                    return Object.assign({}, st, subtaskToRetake)
                } else {
                    return st
                }
            })
            let runAfterRetake = subtasksAfterRetake.filter(st => st.id === payload)[0]
            return Object.assign({}, state, { subtasks: subtasksAfterRetake, run: runAfterRetake })
        case taskEditionActionsTypes.UP_SUBTASK:
            let elementPosition = state.subtasks.map((st, index) => {
                if (st.id === payload) {
                    return index
                } else {
                    return -1
                }
            })
                .filter(pos => pos !== -1)[0]
            if (elementPosition - 1 < 0) {
                return state
            } else {
                let subtaskAfterUp = swapElements(state.subtasks, elementPosition, elementPosition - 1);
                return Object.assign({}, state, {
                    subtasks: renumber(subtaskAfterUp),
                    run: {
                        ...subtaskTemplate,
                        id: 0
                    }
                })
            }
        case taskEditionActionsTypes.DOWN_SUBTASK:
            let elementPositionDown = state.subtasks.map((st, index) => {
                if (st.id === payload) {
                    return index
                } else {
                    return -1
                }
            })
                .filter(pos => pos !== -1)[0]
            if (elementPositionDown + 1 >= state.subtasks.length) {
                return state
            } else {
                let subtaskAfterDown = swapElements(state.subtasks, elementPositionDown, elementPositionDown + 1);
                return Object.assign({}, state, {
                    subtasks: renumber(subtaskAfterDown),
                    run: {
                        ...subtaskTemplate,
                        id: 0
                    }
                })
            }
        case taskEditionActionsTypes.SAVE_TASK_STARTED:
            return Object.assign({}, state, { loading: true })
        case taskEditionActionsTypes.SAVE_TASK_SUCCESS:
            //alert(payload.message)
            let saveSuccessMessage = {
                pending: true,
                message: payload.message,
                type: 'info'//info||error
            }
            if (payload._id) {//only when the info is saved at first time
                return Object.assign({}, state, { loading: false, _id: payload._id, message: saveSuccessMessage })
            } else {// this is when is only an update
                return Object.assign({}, state, { loading: false, message: saveSuccessMessage })
            }
        case taskEditionActionsTypes.SAVE_TASK_FAILED:
            //alert(`Ha ocurrido un error al intentar guardar. Detalles: ${payload}`)
            let saveFailedMessage = {
                pending: true,
                message: `Ha ocurrido un error al intentar guardar. Detalles: ${payload}`,
                type: 'error'//info||error
            }
            return Object.assign({}, state, { loading: false, message: saveFailedMessage })
        case taskEditionActionsTypes.NEW_TASK:
            return newTaskInitialState;
        case taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_STARTED:
            //alert('buscando...')
            return Object.assign({}, state, { loading: true })
        case taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_SUCCESS:
            if (!payload) {
                //alert('No se ha encontrado la tarea solicitada en la base de datos')
                let notExistTaskMessage = {
                    pending: true,
                    message: 'No se ha encontrado la tarea solicitada en la base de datos',
                    type: 'info'//info||error
                }
                return Object.assign({}, newTaskInitialState, { message: notExistTaskMessage });
            } else {
                let subtasksConverted = payload.subtasks.map(st => JSON.parse(st))
                return Object.assign({}, state, payload, { subtasks: subtasksConverted, loading: false, message: messageInitialState })
            }
        case taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_FILED:
            //alert(`Ha ocurrido un error al intentar cargar la tarea. Detalles: ${payload}`)
            let loadTaskFailedMessage = {
                pending: true,
                message: `Ha ocurrido un error al intentar cargar la tarea. Detalles: ${payload}`,
                type: 'error'//info||error
            }
            return Object.assign({}, newTaskInitialState, { message: loadTaskFailedMessage });
        case taskEditionActionsTypes.THERE_IS_NOT_PENDING_MESSAGE:

            return Object.assign({}, state, { message: messageInitialState })
        case taskEditionActionsTypes.SHOW_TAGS_SELECTOR:
            return Object.assign({}, state, { tags_selector:{show:true,category:''} })
        case taskEditionActionsTypes.CLOSE_TAGS_SELECTOR:
            return Object.assign({}, state, { tags_selector:tagsSelectorInitialState })
        case taskEditionActionsTypes.SELECT_CATEGORY:
            return Object.assign({},state,{tags_selector:{show:true,category:payload}})
        case taskEditionActionsTypes.ADD_TAG_TO_TASK:
            if(state.tags.indexOf(payload)!==-1){
                return state
            }
            let tagsAfterAddToTask=[...state.tags,payload]
            return Object.assign({},state,{tags:tagsAfterAddToTask})
        case taskEditionActionsTypes.DELETE_TAG_FROM_TASK:
            let tagsAfterDeleteFromTask=state.tags.filter(tag=>tag!==payload);
            return Object.assign({},state,{tags:tagsAfterDeleteFromTask})
        case taskEditionActionsTypes.RESTART_RUN:
            return Object.assign(state,{},{run:{
                ...subtaskTemplate,
                id: 0
            },
        timer:{
            id:0,
            last_update:0
        }})
        default:
            return state
    }
}
