import {tagsEditorActionsTypes } from "./actions";

const messageInitialState = {
    pending: false,
    message: '',
    type: 'info' //info||error
}

const formInitialState = {
    type: 'category',//category||tag _id: undefined,//this will be provided by mongoDB
    description: '',
    show: false
}


const tagsEditorInitialState = {
    _id: undefined,//this will be provided by mongoDB
    form: formInitialState,
    message: messageInitialState,
    categories: {
    },
    selected_category: '',
    loading:false
   
}

export default (state = tagsEditorInitialState, { type, payload }) => {
    switch (type) {
        case tagsEditorActionsTypes.SHOW_CATEGORY_FORM:
            let formAfterShow = Object.assign({}, state.form, { show: true, type: 'category' })
            return Object.assign({}, state, { form: formAfterShow })
        case tagsEditorActionsTypes.SHOW_TAG_FORM:
            let formAfterShowTag = Object.assign({}, state.form, { show: true, type: 'tag' })
            return Object.assign({}, state, { form: formAfterShowTag, selected_category: payload })
        case tagsEditorActionsTypes.CLOSE_FORM:
            return Object.assign({}, state, { form: formInitialState, selected_category: '' })
        case tagsEditorActionsTypes.WRITE_IN_FORM:
            let formAfterWrite = Object.assign({}, state.form, { description: payload })
            return Object.assign({}, state, { form: formAfterWrite })
        case tagsEditorActionsTypes.ADD_NEW_ELEMENT:
            //content validation
            let emptyRegex = /[a-z]+/i;
            let lokingForEmptyString = state.form.description.search(emptyRegex);
            if (lokingForEmptyString === -1) {
                let confunsingDescriptionMessage = {
                    pending: true,
                    message: 'Para que las etiquetas y la categorias sean utiles, se recomienda escribir descripciones usando el lenguaje natural',
                    type: 'error'
                }
                return Object.assign({}, state, { message: confunsingDescriptionMessage, form: formInitialState })
            }
            //replace
            let fixedDescription=state.form.description.replace(/\s+/g,'_')
            if (state.form.type === "category") {
                let newCategory = fixedDescription;
                let categoryAlreadyExist = state.categories.hasOwnProperty([newCategory])
                if (categoryAlreadyExist) {
                    let messageCategoryAlreadyExist = {
                        pending: true,
                        message: `La categoria "${newCategory}", existe actualmente, por lo que no se premite sobrescribir`,
                        type: 'error'
                    }
                    return Object.assign({}, state, { message: messageCategoryAlreadyExist, form: formInitialState })
                } else {// if Category does not exist
                    let categoriesAfterAdd = Object.assign({}, state.categories, { [newCategory]: [] })
                    return Object.assign({}, state, { categories: categoriesAfterAdd, form: formInitialState, selected_category: payload })
                }
            } else {// for tags
                let categoriesAfterAdd = Object.assign({}, state.categories)
                // to avoid duplicated tags
                let isDuplicatedTag = categoriesAfterAdd[state.selected_category].indexOf(fixedDescription);
                if (isDuplicatedTag !== -1) {
                    let duplicatedTagErrorMesssage = {
                        pending: true,
                        message: `La etiqueta "${fixedDescription}" ya existe en la categoria "${state.selected_category}"`,
                        type: 'error'
                    }
                    return Object.assign({}, state, { message: duplicatedTagErrorMesssage, form: formInitialState })
                }

                for (const cat in categoriesAfterAdd) {
                    if (cat === state.selected_category) {
                        categoriesAfterAdd[cat] = [...state.categories[cat], fixedDescription]
                    }
                    //console.log(categoriesAfterAdd[cat])
                }
                return Object.assign({}, state, { categories: categoriesAfterAdd, form: formInitialState, selected_category: '' },)
            }
        //----------------------------------------------------------------------------
        case tagsEditorActionsTypes.THERE_IS_NOT_PENDING_MESSAGE_TAGS_EDITOR:
            return Object.assign({}, state, { message: messageInitialState })
        case tagsEditorActionsTypes.DELETE_CATEGORY:
            let categoriesAfterDeleteCategory=Object.assign({},state.categories);
            delete categoriesAfterDeleteCategory[payload];
            return Object.assign({},state,{categories:categoriesAfterDeleteCategory})
        case tagsEditorActionsTypes.DELETE_TAG:
            let categoriesAfterDeleteTag=Object.assign({},state.categories)
            categoriesAfterDeleteTag[payload.category]=state.categories[payload.category].filter(tag=>tag!==payload.tag)
            return Object.assign({},state,{categories:categoriesAfterDeleteTag})
        case tagsEditorActionsTypes.SAVE_CATEGORIES_STARTED:
            return Object.assign({},state,{loading:true});
        case tagsEditorActionsTypes.SAVE_CATEGORIES_SUCCESS:
            let saveCategoriesSuccessMessage={
                pending:true,
                message:payload.message,
                type:'info'
            }
            if(payload._id){
                return Object.assign({},state,{message:saveCategoriesSuccessMessage,loading:false,_id:payload._id})

            }else{
                return Object.assign({},state,{message:saveCategoriesSuccessMessage,loading:false})

            }
        case tagsEditorActionsTypes.SAVE_CATEGORIES_FAILED:
            let saveCategoriesFailedMessage={
                pending:true,
                message:`Ha ocurrido un error al tratar de guaradar la información. Detalles: ${payload}`,
                type:'error'
            }
            return Object.assign({},state,{message:saveCategoriesFailedMessage, loading:false})
        case tagsEditorActionsTypes.GET_ALL_CATEGORIES_STARTED:
            return Object.assign({},state,{loading:true})
        case tagsEditorActionsTypes.GET_ALL_CATEGORIES_SUCCESS:
            if(payload.length<1){
                return Object.assign({},state,{loading:false})
            }
            let categoriesFromServer=JSON.parse(payload[0].categories)
            let  idFromServer=payload[0]._id
            return Object.assign({},state,{
                categories:categoriesFromServer,
                loading:false,
                _id:idFromServer
            })
        case tagsEditorActionsTypes.GET_ALL_CATEGORIES_FAILED:
            let getCategoriesFailedMessage={
                pending:true,
                message:`Ha ocurrido un error. Detalles: ${payload}`,
                type:'error'
            }
        return Object.assign({},state,{message:getCategoriesFailedMessage,loading:false})
        default:
            return state
    }

}