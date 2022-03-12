
export const tagsEditorActionsTypes = {
    SHOW_CATEGORY_FORM: 'SHOW_CATEGORY_FORM',
    SHOW_TAG_FORM: 'SHOW_TAG_FORM',
    CLOSE_FORM: 'CLOSE_FORM',
    WRITE_IN_FORM: 'WRITE_IN_FORM',
    ADD_NEW_ELEMENT: 'ADD_NEW_ELEMENT',
    THERE_IS_NOT_PENDING_MESSAGE_TAGS_EDITOR: 'THERE_IS_NOT_PENDING_MESSAGE_TAGS_EDITOR',
    DELETE_CATEGORY: 'DELETE_CATEGORY',
    DELETE_TAG: 'DELETE_TAG',
    SAVE_CATEGORIES_STARTED: 'SAVE_CATEGORIES_STARTED',
    SAVE_CATEGORIES_SUCCESS: 'SAVE_CATEGORIES_SUCCESS',
    SAVE_CATEGORIES_FAILED: 'SAVE_CATEGORIES_FAILED',
    GET_ALL_CATEGORIES_STARTED: 'GET_ALL_CATEGORIES_STARTED',
    GET_ALL_CATEGORIES_SUCCESS: 'GET_ALL_CATEGORIES_SUCCESS',
    GET_ALL_CATEGORIES_FAILED: 'GET_ALL_CATEGORIES_FAILED'
}

export const showCategoryForm = () => ({
    type: tagsEditorActionsTypes.SHOW_CATEGORY_FORM,
})
export const showTagForm = (category) => ({
    type: tagsEditorActionsTypes.SHOW_TAG_FORM,
    payload: category
})

export const closeForm = () => ({
    type: tagsEditorActionsTypes.CLOSE_FORM,
})

export const writeInForm = (description) => ({
    type: tagsEditorActionsTypes.WRITE_IN_FORM,
    payload: description
})

export const addNewElement = () => ({
    type: tagsEditorActionsTypes.ADD_NEW_ELEMENT
})

export const thereIsNotPendingMessageTagsEditor = () => ({
    type: tagsEditorActionsTypes.THERE_IS_NOT_PENDING_MESSAGE_TAGS_EDITOR
})


export const deleteCategory = (category) => ({
    type: tagsEditorActionsTypes.DELETE_CATEGORY,
    payload: category
})

export const deleteTag = (category, tag) => ({
    type: tagsEditorActionsTypes.DELETE_TAG,
    payload: {
        category,
        tag
    }
})


export const tryToSaveCategories = (catData) => {
    return (dispatch,getState) => {
        dispatch(saveCategoriesStarted())

        try{
            let dataToSend=Object.assign({},catData,{
                email:getState().auth_state.session.user.email
            })
            fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/categories', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
            .then(res => {
                if (!res.ok){
                    throw Error(res.status);
                }
                return res.json()
            })
                .then(response => dispatch(saveCategoriesSuccess(response)))
                .catch(error => dispatch(saveCategoriesFailed(error)))
        }catch(error){
            console.error(error)
        }
        
    }
}

export const saveCategoriesStarted = () => ({
    type: tagsEditorActionsTypes.SAVE_CATEGORIES_STARTED,
})

export const saveCategoriesSuccess = (response) => ({
    type: tagsEditorActionsTypes.SAVE_CATEGORIES_SUCCESS,
    payload: response
})

export const saveCategoriesFailed = (error) => ({
    type: tagsEditorActionsTypes.SAVE_CATEGORIES_FAILED,
    payload: error
})

export const tryToGetAllCategories = () => {
    return (dispatch) => {
        dispatch(getAllCategoriesStarted())
        try{
           
        fetch(process.env.NEXT_PUBLIC_DOMAIN + '/api/categories')
        .then(res => {
            if (!res.ok){
                throw Error(res.status);
            }
            return res.json()
        })
            .then(res=>dispatch(getAllCategoriesSuccess(res)))
            .catch(error=>dispatch(getAllCategoriesFailed(error)))
        }catch(error){
            console.log(error)
        }
        
    }
}


export const getAllCategoriesStarted = () => ({
    type: tagsEditorActionsTypes.GET_ALL_CATEGORIES_STARTED
})

export const getAllCategoriesSuccess = (response) => ({
    type: tagsEditorActionsTypes.GET_ALL_CATEGORIES_SUCCESS,
    payload: response
})

export const getAllCategoriesFailed = (error) => ({
    type: tagsEditorActionsTypes.GET_ALL_CATEGORIES_SUCCESS,
    payload: error
})