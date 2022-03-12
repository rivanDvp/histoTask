import Layout from "../components/layout/Layout"

import TasksList from "../components/task_manager/TasksList"
import Loading from "../components/auxiliary_components/Loading"
import ToastMessenger from "../components/auxiliary_components/ToastMessenger"
import { newTask } from "../store/task_in_edition/actions"
import { useDispatch,useSelector } from "react-redux"
import { useRouter } from "next/dist/client/router"
import { openTagsFilter, thereIsNotPendingMessageManager } from "../store/task_manager/actions"
import TagsFilter from "../components/task_manager/TagsFilter"



export default function MisTareas() {
    const dispatch=useDispatch()
    const {loading,message}=useSelector(state=>state.task_manager)
    const router=useRouter()
    
    const handleNewTask=()=>{
        dispatch(newTask())//this is necesary to get a empty new task
        router.push('/new_task')
    }
    const handleTagsEdit=()=>{
        router.push('/Tags_Edit')
    }
    return (
        <Layout>
            <Loading
                loading={loading}
            />
            <div className="">
            <ToastMessenger
            actionClose={()=>dispatch(thereIsNotPendingMessageManager())}
            message={message}
            />
            </div>
            <h2>Mis Tareas</h2>
            <hr />
            <button className="btn-primary"
                onClick={handleNewTask}
            >Nueva Tarea&#10010;</button>
            {" | "}
            <button
            className="btn-success"
            onClick={handleTagsEdit}
            >Editar Etiquetas&#127991;</button>
            {" | "}
            <button
            className="btn-info"
            onClick={()=>dispatch(openTagsFilter())}
            > Filtrar	
            &#9660;</button>
            <hr/>
            <TagsFilter/>
            <TasksList />

        </Layout>
    )
}
