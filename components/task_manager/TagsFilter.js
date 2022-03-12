import { tryToGetAllCategories } from '../../store/tags_editor/actions'
//import { addTagToTask, closeTagsSelector, deleteTagFromTask, selectCategory } from '../../store/task_in_edition/actions';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTagToQuery, closetagsFilter,deleteTagFromQuery,selectFilterCategory, tryToCleanQuery, tryToQuerySearch } from '../../store/task_manager/actions'

export default function TagsFilter() {
    const dispatch = useDispatch()
    const { status } = useSelector(state => state.auth_state)
    const { show,category,query } = useSelector(state => state.task_manager.filter)
    const allcategories = useSelector(state => state.tags_editor.categories)
    useEffect(() => {
        dispatch(tryToGetAllCategories())
    }, [status])

    const handleSelectCategory=(e)=>{
        let selectedCategory=e.target.value; 
        dispatch(selectFilterCategory(selectedCategory))
    }

    const handleAddTagToQuery=(e)=>{
        let regex =/(?<=btn-filter-tag-selector-)\S+/
        let id=decodeURIComponent(e.target.id)
        try{
            let tag=id.match(regex)[0]
            dispatch(addTagToQuery(tag))

        }catch(error){
            console.error({error})
        }
    } 

    const handleDeleteTagfromQuery=(e)=>{

        let regex =/(?<=btn-filter-delete-tag-selector-)\S+/
        let id=decodeURIComponent(e.target.id)
        try{
            let tag=id.match(regex)[0]
            let r=confirm(`¿Desea remover la siguiente etiqueta: ${tag}?`)
            if(!r)return
            dispatch(deleteTagFromQuery(tag))

        }catch(error){
            console.error({error})
        }
    }
    return (
        <>
            {show
                ? <>
                    <button
                        className='btn-danger'
                        onClick={()=>dispatch(closetagsFilter())}
                    >X</button>
                     <button
                        className='btn-primary m-1'
                        onClick={()=>dispatch(tryToQuerySearch())}
                    >Aplicar</button>
                    <button
                        className='btn-success m-1'
                        onClick={()=>dispatch(tryToCleanQuery())}
                    >Limpiar</button>
                    <br />

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
                        key={'btn-filter-tag-selector-'+encodeURIComponent(`${category}-${tag}`)}
                        id={'btn-filter-tag-selector-'+encodeURIComponent(`${category}-${tag}`)}
                        onClick={handleAddTagToQuery}
                        className='btn btn-ligth'
                        >
                            {tag}
                        </button>
                    ))}
                    <br/>
                    {query.map(tag=>(
                        <>
                        <button
                        key={'btn-filter-delete-tag-selector-'+encodeURIComponent(tag)}
                        id={'btn-filter-delete-tag-selector-'+encodeURIComponent(tag)}
                        onClick={handleDeleteTagfromQuery}
                        className='btn btn-info'
                        >{tag}</button>
                        {' | '}
                        </>
                        
                    ))}
                    <hr/>

                </>
                : <></>}
        </>
    )
}
