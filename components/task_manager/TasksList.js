import { useDispatch, useSelector } from "react-redux";
import { taskManagerSendMessage, tryToGetAllTasks } from "../../store/task_manager/actions";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Table from 'react-bootstrap/Table'
import Link from "next/link";
import { trytoDeleteTask } from "../../store/task_manager/actions";
import style from "./TasksList.module.css"

export default function TasksList() {
    const dispatch = useDispatch();
    const { tasks } = useSelector(state => state.task_manager)
    const {status}=useSelector(state=>state.auth_state)
    const router=useRouter()
    useEffect(() => {
       dispatch(tryToGetAllTasks())
    }, [,status])

    const changeDateString = (dateString) => {
        let date = new Date(dateString);
        return date.toLocaleString()
    }

    const handleDeleteTask=(e)=>{
        let r=window.confirm('¿Esta seguro de eleminar la tarea? La informacion no podrá ser recuperada')
        if (!r) return
        let regex1=/(?<=btn-delete-)\w+/;
        let id=e.target.id;
        console.log('id de la tarea a eliminar ui',id)
        try{
            let _id=id.match(regex1)[0]
            dispatch(trytoDeleteTask(_id))
        }catch{
            let deleteErrorMessage={
                pending:true,
                message:'Ha ocurrido un error, posiblemente desea eliminar una tarea que actualmente no existe',
                type:'error'
            }
            dispatch(taskManagerSendMessage(deleteErrorMessage))
        }

    }
    const handleGoToStat=(e)=>{
        let regex1=/(?<=btn-stat-)\w+/;
        let id=e.target.id;
        try{
            let _id=id.match(regex1)[0]
            router.push('/Stats/'+_id)
        }catch{
            let deleteErrorMessage={
                pending:true,
                message:'Ha ocurrido un error, posiblemente desea eliminar una tarea que actualmente no existe',
                type:'error'
            }
            dispatch(taskManagerSendMessage(deleteErrorMessage))
        }
    }
    return (
        <div className={style['container']}>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre de la tarea</th>
                    <th>Creado en</th>
                    <th>Modificado en</th>
                    <th>Modificar</th>
                    <th>Estadísticas</th>
                    <th>Eliminar</th>
                </tr>
            </thead>

            <tbody>
                {tasks.map((task, index) => {
                    let _id= task._id;
                    return <tr key={'a'+_id}>
                        <td key={'b'+_id}>{index + 1}</td>
                        <td key={'c'+_id}>{task.task_name}</td>
                        <td key={'d'+_id}>{changeDateString(task.createdAt)}</td>
                        <td key={'e'+_id}>{changeDateString(task.updatedAt)}</td>
                        <td key={'f'+_id}>
                            <Link href={'/edit/'+task._id}>
                                <a className='btn btn-warning'>&#9999;</a>
                            </Link>
                        </td>
                        <td key={'g'+_id}>
                            <button
                            key={'btn-stat-'+_id}
                            id={'btn-stat-'+_id}
                            onClick={handleGoToStat}
                            className="btn btn-secondary"
                            >&#128200;</button>
                        </td>
                        <td key={'h'+_id}><button
                        key={'btn-delete-'+_id}
                        id={'btn-delete-'+_id}
                        onClick={handleDeleteTask}
                            className="btn btn-danger"
                        >
                            &#10007;</button></td>



                    </tr>
                })}
            </tbody>
        </Table>
        </div>
    )
}