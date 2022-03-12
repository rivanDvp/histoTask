import { useSelector, useDispatch } from "react-redux"
import {
    addSubtask,
    deleteSubtask,
    changeDescriptionSubtask,
    changeTaskName,
    changeSubtaskName,
    selectSubtaskToRun,
    upSubtask,
    downSubtask,
    tryToSave,
    newTask,
    thereIsNotPendingMessage,
    showTagsSelector,
    restartRun
} from "../../store/task_in_edition/actions";
import identifyId from "../../auxiliarJS/identifyId";
import style from "./TaskEditor.module.css"
import ControlBar from "./ControlBar";
import ToastMessenger from "../auxiliary_components/ToastMessenger";
import Loading from "../auxiliary_components/Loading";
import TagsSelector from "./TagsSelector";
import { useEffect } from "react";

export default function TaskEditor() {
    const dispatch = useDispatch();
    const { subtasks, task_name, _id, run, loading, message, tags,timer } = useSelector(state => state.task_in_edition)

    useEffect(()=>{
        dispatch(restartRun())
        clearInterval(timer.id)
    },[])
    const handleAdd = () => {
        dispatch(addSubtask());
        clearInterval()
    }
    const handleOnChangeSubtaskDescription = (e) => {
        let { id, value } = e.target;
        let idSubtaskToEdit = identifyId(id);

        dispatch(changeDescriptionSubtask(idSubtaskToEdit, value))
    }
    const handleDelete = (e) => {
        let id = identifyId(e.target.id)
        let r = window.confirm(`¿Desea eliminar la subtarea id:${id}?`)
        if (!r) { return }
        if (id === -1) {
            return
        } else {
            dispatch(deleteSubtask(id))
            return
        }
    }
    const handleOnChangeTaskName = (e) => {
        let value = e.target.value;
        dispatch(changeTaskName(value))
    }

    const handleOnChangeSubtaskName = (e) => {
        let id = identifyId(e.target.id);
        let name = e.target.value;
        dispatch(changeSubtaskName(id, name))
    }

    const handleSelectSubtaskToRun = (e) => {
        let id = identifyId(e.target.id);
        dispatch(selectSubtaskToRun(id));

    }

    const handleUpSubtask = (e) => {
        let id = identifyId(e.target.id);
        dispatch(upSubtask(id));
    }

    const handleDownSubtask = (e) => {
        let id = identifyId(e.target.id);
        dispatch(downSubtask(id));
    }

    const handleSave = () => {
        let taskToSave = {
            _id,
            task_name,
            subtasks,
            tags
        }
        dispatch(tryToSave(taskToSave))
    }

    const handleNewTask = () => {
        let r = window.confirm('¿Desea un nueva plantilla en blanco? Si no guarda el trabajo actual, la información no se podrá recuperar')
        if (!r) return
        dispatch(newTask())
    }

    const handleAddTags = () => {
        dispatch(showTagsSelector())
    }
    return (
        <div className={style["task-editor"]}>
            <div className={style['float-container']}>
                <ToastMessenger
                    actionClose={() => dispatch(thereIsNotPendingMessage())}
                    message={message}
                />
            </div>

            <Loading
                loading={loading}
            />
            {run.id === 0 ? <div /> : <ControlBar />}
            <label> Nombre de la tarea:
                <input type="text"
                    value={task_name}
                    onChange={handleOnChangeTaskName}
                    className={style["input-name"]}
                    autoComplete='off'
                />
            </label>

            {/*---------------------condicional rendering--------------*/
                run.status === 'STARTED'
                    ? <div className={style['curtain']} />
                    : <>
                        <hr />
                        <p className="text-primary">Subtareas:{" "}
                        </p>
                        <div className="">
                            <button className="btn-primary" onClick={handleAdd}>Agregar &#10010;</button>
                            {" | "}
                            <button className="btn-warning" onClick={handleNewTask}>Nuevo&#10036;</button>
                            {" | "}
                            <button
                                className="btn-success"
                                onClick={handleSave}
                            >Guardar&#128190;</button>
                            {loading ? <span className={style['loading']}>&#9203;</span> : ''}
                            {" | "}
                            <button
                                className="btn-secondary"
                                onClick={handleAddTags}
                            >Etiquetas&#127991;</button>
                        </div>
                        <TagsSelector />
                        {subtasks.map(({ id, name, description, status }) => (
                            <div
                                key={"div-subtask" + id}
                                className={style["div-subtask"]}>
                                <label key={'newsubtask-label-a' + id}>
                                    subtarea#{id}:
                                    <input
                                        key={"newSubtask-name" + id}
                                        id={"newSubtask-name" + id}
                                        value={name}
                                        type='text'
                                        onChange={handleOnChangeSubtaskName}
                                        placeholder='Nombre de la subtarea...'
                                        className={style["input-name"]}
                                        autoComplete='off'
                                    />
                                </label>
                                <br />
                                <label key={'newsubtask-label-b' + id}>
                                    Descripción:
                                    <textarea key={'newsubtask' + id}
                                        id={'newsubtask-description' + id}
                                        value={description}
                                        className={style['input-description']}
                                        onChange={handleOnChangeSubtaskDescription}
                                        placeholder="describa la subtarea..."
                                    />

                                </label>


                                <br />
                                <label key={'newsubtask-label-c' + id} >
                                    Estado: <b className="">{status}</b>
                                </label>{" "}
                                <button
                                    key={'delete-btn' + id}
                                    id={'delete-btn' + id}
                                    className="btn-danger"
                                    onClick={handleDelete}
                                >Borrar</button>

                                <button
                                    key={'select-subtask-btn' + id}
                                    id={'select-subtask-btn' + id}
                                    className="btn-warning"
                                    onClick={handleSelectSubtaskToRun}
                                >Seleccionar</button>
                                {' | '}
                                <button
                                    key={'up-subtask-btn' + id}
                                    id={'up-subtask-btn' + id}
                                    onClick={handleUpSubtask}
                                    className='btn-success'
                                > &#9650;
                                </button>

                                <button
                                    key={'down-subtask-btn' + id}
                                    id={'down-subtask-btn' + id}
                                    onClick={handleDownSubtask}
                                    className='btn-success'
                                > &#9660;
                                </button>
                            </div>
                        ))
                        }
                        
                    </>
            }

        </div>
    )
}
