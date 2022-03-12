import { tryToGetAllCategories } from '../../store/tags_editor/actions'
import { addTagToTask, closeTagsSelector, deleteTagFromTask, selectCategory } from '../../store/task_in_edition/actions';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function TagsSelector() {
    const dispatch = useDispatch();
    const {category,show} = useSelector(state => state.task_in_edition.tags_selector)
    const tags=useSelector(state=>state.task_in_edition.tags)
    useEffect(() => {
        dispatch(tryToGetAllCategories())
    }, [])
    const allcategories = useSelector(state => state.tags_editor.categories)

    const handleClose=()=>{
        dispatch(closeTagsSelector())
    }
    const handleSelectCategory=(e)=>{
        let selectedCategory=e.target.value; 
        dispatch(selectCategory(selectedCategory))
    }
    const handleAddTagToTask=(e)=>{
        let regex =/(?<=btn-add-tag-selector-)\S+/
        let id=decodeURIComponent(e.target.id)
        try{
            let tag=id.match(regex)[0]
            dispatch(addTagToTask(tag))

        }catch(error){
            console.error({error})
        }
    } 

    const handleDeleteTagToTask=(e)=>{

        let regex =/(?<=btn-delete-tag-selector-)\S+/
        let id=decodeURIComponent(e.target.id)
        try{
            let tag=id.match(regex)[0]
            let r=confirm(`¿Desea remover la siguiente etiqueta: ${tag}?`)
            if(!r)return
            dispatch(deleteTagFromTask(tag))

        }catch(error){
            console.error({error})
        }
    } 
    return (
        <>
            {show
                ? <div>
                    <hr/>
                    <button
                    className='btn-danger'
                    onClick={handleClose}
                    >X</button><br/>

                    <select value={category} onChange={handleSelectCategory}>
                    <option value=""></option>
                    {Object.keys(allcategories).map(cat => (
                        <option value={cat}>{cat}</option>
                    ))}
                    </select>
                    {category===''
                    ?<></>
                    : allcategories[category].map(tag=>(
                        <button
                        key={'btn-add-tag-selector-'+encodeURIComponent(`${category}-${tag}`)}
                        id={'btn-add-tag-selector-'+encodeURIComponent(`${category}-${tag}`)}
                        onClick={handleAddTagToTask}
                        className='btn btn-ligth'
                        >
                            {tag}
                        </button>
                    ))}
                    <hr/>
                    {tags.map(tag=>(
                        <>
                        <button
                        key={'btn-delete-tag-selector-'+encodeURIComponent(tag)}
                        id={'btn-delete-tag-selector-'+encodeURIComponent(tag)}
                        onClick={handleDeleteTagToTask}
                        className='btn btn-warning'
                        >{tag}</button>
                        {' | '}
                        </>
                        
                    ))}
                </div>
                : <></>

            }
        </>


    )
}
