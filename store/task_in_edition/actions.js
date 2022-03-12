
export const taskEditionActionsTypes = {
  ADD_SUBTASK: 'ADD_SUBTASK',
  DELETE_SUBTASK: 'DELETE_SUBTASK',
  CHANGE_DESCRIPTION_SUBTASK: 'CHANGE_DESCRIPTION_SUBTASK',
  CHANGE_TASK_NAME: 'CHANGE__TASK_NAME',
  CHANGE_SUBTASK_NAME: 'CHANGE_SUBTASK_NAME',
  SELECT_SUBTASK_TO_RUN: 'SELECT_SUBTASK_TO_RUN',
  RUN_SUBTASK: 'RUN_SUBTASK',
  PAUSE_SUBTASK: 'PAUSE_SUBTASK',
  FINISH_SUBTASK: 'FINISH_SUBTASK',
  UPDATE_TIMER: 'UPDATE_TIMER',
  RETAKE_SUBTASK: 'RETAKE_SUBTASK',
  UP_SUBTASK: 'UP_SUBTASK',
  DOWN_SUBTASK: 'DOWN_SUBTASK',
  SAVE_TASK_STARTED: 'SAVE_TASK_STARTED',
  SAVE_TASK_SUCCESS: 'SAVE_TASK_SUCCESS',
  SAVE_TASK_FAILED: 'SAVE_TASK_FAILED',
  NEW_TASK: 'NEW_TASK',
  LOAD_AN_EXISTING_TASK_STARTED: 'LOAD_AN_EXISTING_TASK_STARTED',
  LOAD_AN_EXISTING_TASK_SUCCESS: 'LOAD_AN_EXISTING_TASK_SUCCESS',
  LOAD_AN_EXISTING_TASK_FILED: 'LOAD_AN_EXISTING_TASK_FILED',
  THERE_IS_NOT_PENDING_MESSAGE: 'THERE_IS_NOT_PENDING_MESSAGE',
  SHOW_TAGS_SELECTOR: 'SHOW_TAGS_SELECTOR',
  CLOSE_TAGS_SELECTOR: 'CLOSE_TAGS_SELECTOR',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
  ADD_TAG_TO_TASK: 'ADD_TAG_TO_TASK',
  DELETE_TAG_FROM_TASK: 'DELETE_TAG_FROM_TASK:',
  RESTART_RUN: 'RESTART_RUN'
}

export const addSubtask = () => {
  return { type: taskEditionActionsTypes.ADD_SUBTASK }
}
export const deleteSubtask = (id) => {
  return {
    type: taskEditionActionsTypes.DELETE_SUBTASK,
    payload: id
  }
}

export const changeDescriptionSubtask = (id, description) => {
  return {
    type: taskEditionActionsTypes.CHANGE_DESCRIPTION_SUBTASK,
    payload: {
      id,
      description
    }
  }
}

export const changeTaskName = (task_name) => {
  return {
    type: taskEditionActionsTypes.CHANGE_TASK_NAME,
    payload: task_name
  }
}

export const changeSubtaskName = (id, name) => {
  return {
    type: taskEditionActionsTypes.CHANGE_SUBTASK_NAME,
    payload: {
      id,
      name
    }
  }
}

export const selectSubtaskToRun = (id) => {
  return {
    type: taskEditionActionsTypes.SELECT_SUBTASK_TO_RUN,
    payload: id
  }
}

export const runSubtask = (id, start_date, timerID) => {
  return {
    type: taskEditionActionsTypes.RUN_SUBTASK,
    payload: { id, start_date, timerID }
  }
}

export const pauseSubtask = (id, pause_date) => {
  return {
    type: taskEditionActionsTypes.PAUSE_SUBTASK,
    payload: { id, pause_date }
  }
}

export const finishSubtask = (id, finish_date) => {
  return {
    type: taskEditionActionsTypes.FINISH_SUBTASK,
    payload: { id, finish_date }
  }
}

export const updateTimer = (last_update) => {
  return {
    type: taskEditionActionsTypes.UPDATE_TIMER,
    payload: last_update
  }
}

export const retakeSubtask = (id) => {
  return {
    type: taskEditionActionsTypes.RETAKE_SUBTASK,
    payload: id
  }
}

export const upSubtask = (id) => {
  return {
    type: taskEditionActionsTypes.UP_SUBTASK,
    payload: id
  }
}

export const downSubtask = (id) => {
  return {
    type: taskEditionActionsTypes.DOWN_SUBTASK,
    payload: id
  }
}
export const tryToSave = (taskToSave) => {
  return (dispatch, getState) => {
    dispatch(saveTaskStarted());

    let email=getState().auth_state.session.user.email;
    let dataToSave=Object.assign({},taskToSave,{email})
    fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/save', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(dataToSave)
    })
    .then(res => {
      if (!res.ok){
          throw Error(res.status);
      }
      return res.json()
  })
      .then(data => dispatch(saveTaskSuccess(data)))
      .catch(error => dispatch(saveTaskFalied(error)))
  }
}

export const saveTaskStarted = () => {
  return {
    type: taskEditionActionsTypes.SAVE_TASK_STARTED
  }
}
export const saveTaskSuccess = (data) => {
  return {
    type: taskEditionActionsTypes.SAVE_TASK_SUCCESS,
    payload: data
  }
}

export const saveTaskFalied = (err) => {
  return {
    type: taskEditionActionsTypes.SAVE_TASK_FAILED,
    payload: err
  }
}
export const newTask = () => {
  return {
    type: taskEditionActionsTypes.NEW_TASK
  }
}

export const tryLoadExistingTask = (_id) => {
  return (dispatch) => {
    dispatch(loadAnExistingTaskStarted());

    fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/tasks/' + _id)
    .then(res => {
      if (!res.ok){
          throw Error(res.status);
      }
      return res.json()
  })
      .then(data => {
        console.log(data.task)
        return dispatch(loadAnExistingTaskSuccess(data.task))
      })
      .catch(error => dispatch(loadAnExistingTaskFalied(error)))
  }
}

export const loadAnExistingTaskStarted = () => {
  return {
    type: taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_STARTED
  }
}
export const loadAnExistingTaskSuccess = (data) => {
  return {
    type: taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_SUCCESS,
    payload: data
  }
}

export const loadAnExistingTaskFalied = (error) => ({
  type: taskEditionActionsTypes.LOAD_AN_EXISTING_TASK_FILED,
  payload: error
})

export const thereIsNotPendingMessage = () => ({
  type: taskEditionActionsTypes.THERE_IS_NOT_PENDING_MESSAGE
})

export const showTagsSelector = () => ({
  type: taskEditionActionsTypes.SHOW_TAGS_SELECTOR
})

export const closeTagsSelector = () => ({
  type: taskEditionActionsTypes.CLOSE_TAGS_SELECTOR
})

export const selectCategory = (category) => ({
  type: taskEditionActionsTypes.SELECT_CATEGORY,
  payload: category
})

export const addTagToTask = (tag) => ({
  type: taskEditionActionsTypes.ADD_TAG_TO_TASK,
  payload: tag
})

export const deleteTagFromTask = (tag) => ({
  type: taskEditionActionsTypes.DELETE_TAG_FROM_TASK,
  payload: tag
})

export const restartRun = () => ({
  type: taskEditionActionsTypes.RESTART_RUN
})