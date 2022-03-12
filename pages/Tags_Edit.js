import Layout from "../components/layout/Layout"
import TagsForm from "../components/tags_editor/TagsForm"
import ToastMessenger from '../components/auxiliary_components/ToastMessenger'
import CategoryList from "../components/tags_editor/CategoryList";
import Loading from "../components/auxiliary_components/Loading"
import { 
    showCategoryForm,
    closeForm,
    writeInForm,
    addNewElement,
    thereIsNotPendingMessageTagsEditor,
    tryToSaveCategories,
    tryToGetAllCategories,
    
} from "../store/tags_editor/actions";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";

export default function Tags_Edit() {

    const dispatch = useDispatch();
const {form, message,categories, loading,_id}=useSelector(state => state.tags_editor)
const {status}= useSelector(state=>state.auth_state)
useEffect(() => {
    dispatch(tryToGetAllCategories())
}, [status])

const handleNewCategory=()=>{
    dispatch(showCategoryForm())
}
const handleSaveCategories=()=>{
    let dataToSave={
        _id,
        categories        
    }
    dispatch(tryToSaveCategories(dataToSave))
}

    return (
        <Layout>
            <Loading
            loading={loading}
            />
            <ToastMessenger
            actionClose={()=>dispatch(thereIsNotPendingMessageTagsEditor())}
            message={message}
            />
            <h2>Editar Etiquetas</h2>
            <hr/>

            <button
            className="btn-primary"
            onClick={handleNewCategory}
            id="btn-nueva-categoria"
            >Nueva Categoria</button>
            {" | "}
            <button 
            className="btn-success"
            onClick={handleSaveCategories}
            >Guardar&#128190;</button>
            <hr/>
            <TagsForm
            form={form}
            actionClose={()=>dispatch(closeForm())}
            actionWrite={(description)=>dispatch(writeInForm(description))}
            actionAdd={()=>dispatch(addNewElement())}
            />
            <CategoryList
            categories={categories}
            />
            

        </Layout>
    )
}
