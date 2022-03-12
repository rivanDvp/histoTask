import { useDispatch } from "react-redux"
import { 
    showTagForm,
    deleteCategory,
    deleteTag
} from "../../store/tags_editor/actions"
import { closeTagsSelector } from "../../store/task_in_edition/actions"
import style from './categoryList.module.css'

export default function CategoryList(props) {
    const dispatch = useDispatch()
    
    const handleNewTag = (e) => {
        let regex1 = /(?<=btn-add-tag-)\S+/
        let id = decodeURIComponent(e.target.id);
        
        try {
            let category = id.match(regex1)[0]
            dispatch(showTagForm(category))
        } catch (error) {
            console.error('ha ocurrido un error:' + error)
            return
        }


    }
    const handleDeleteCategory=(e)=>{
        let regex1 = /(?<=btn-delete-cat-)\S+/
        let id = decodeURIComponent(e.target.id);
        try {
            let category = id.match(regex1)[0]
            let r=confirm(`¿Desea eliminar la categoria "${category}"?`)
            if(!r)return
            dispatch(deleteCategory(category))
        } catch (error) {
            
        }
        dispatch(closeTagsSelector())//to avoid bug that happend when a "category" is deleted
    }

    const handleDeleteTag=(e)=>{
        let id =decodeURIComponent(e.target.id);
        let regexCat= /(?<=btn-delete-tag-)\S+(?=--)/;
        let regexTag=/(?<=--)\S+/;
        try{
            let category=id.match(regexCat)[0]; 
            let tag=id.match(regexTag)[0];
            let r=confirm(`¿Dese Eliminar la etiqueta "${tag}" de la categoria "${category}"?`)
            if (!r)return
            dispatch(deleteTag(category,tag))
        }catch(error){
            console.error('ha ocurrido un error:' + error)
            return
        }
    }
    return (
        <div className={style['div-container']}>
            {Object.keys(props.categories).map(cat => (
                <>
                    <h4 key={"title-" + encodeURIComponent(cat)}>{cat}</h4>
                    
                    <button key={"btn-add-tag-" + encodeURIComponent(cat)} id={"btn-add-tag-" + encodeURIComponent(cat)} className="btn-success"
                        onClick={handleNewTag}
                    > &#10010;</button>

                    <button key={"btn-delete-cat-" + cat}
                        id={"btn-delete-cat-" + encodeURIComponent(cat)}
                        className="btn-danger"
                        onClick={handleDeleteCategory}
                    > &#10007;</button>

                    <div className={style['tags-container']}>
                        {props.categories[cat].map(tag => (
                            <span className={style['tags']}>

                                <button key={"btn-delete-tag-" + encodeURIComponent(cat) + encodeURIComponent(tag)}
                                    id={"btn-delete-tag-" + encodeURIComponent(cat) +'--'+ encodeURIComponent(tag)}
                                    className="btn btn-outline-danger"
                                    onClick={handleDeleteTag}
                                    > &#10007;</button>
                                
                                {' | ' + tag}
                            </span >
                        ))}

                    </div>

                    <hr />

                </>
            ))}
        </div>
    )
}
