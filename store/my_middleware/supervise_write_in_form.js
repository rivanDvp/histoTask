import { tagsEditorActionsTypes } from "../tags_editor/actions";

export default store=>next=>action=>{
if(action.type===tagsEditorActionsTypes.WRITE_IN_FORM){
    let description=action.payload
    .replace(/\s+/g,'_')
    .replace(/[^a-z0-9ñáéíóú_]/ig,'');
    return next({
        type:tagsEditorActionsTypes.WRITE_IN_FORM,
        payload: description.toLowerCase().slice(0,30)
    })
    
}else{
    return next(action)
}
}