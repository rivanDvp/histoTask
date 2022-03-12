import style from "./Help.module.css"
import tranlateHelpTopic from "../../auxiliarJS/tranlateHelpTopic"
import HelpNav from "./HelpNav"
import Image from "next/image"
import Image1 from "./images/task_manager.svg"
export default function HelpTaskManager(props) {
    return (
    <>
     <HelpNav/>
    <div className={style["div-container"]}>
                   
            <h1 className={style["title"]}>Ayuda: {tranlateHelpTopic[props.topic]}</h1>

            <Image src={Image1} />
            <p>El administrador de tareas tiene los siguientes elementos a destacar:</p>
            <ol>
                <li><b>Mis tareas</b>, esta pestaña aparece al iniciar sesión, y es la que enlaza al administrador de tareas.</li>
                <li><b>Nueva Tarea</b>, este botón permite acceder al editor de tareas para trabajar con una tarea desde cero. </li>
                <li><b>Editor de etiquetas</b>, este botón enlaza con la utilidad que permite admistrar las etiquetas con la cual se organizarán las tareas.</li>
                <li> <b>Filtrar</b>, este botón sirve para desplegar un filtro de tareas que realiza la selección en base a etiquetas.</li>
                <li><b>Tabla de tareas</b>, acá se listan las tareas que han sido guardadas.</li>
                <li><b>Modificar</b>, este botón (con el icono de un lápiz), enlaza al editor de tareas para poder trabajar con una tarea preexistente.</li>
                <li><b>Estadísticas</b>, este botón enlaza con el visor de estadísticas de la tarea correlativa.</li>
                <li><b>Eliminar</b>,borra de manera permanente, de la base de datos, la información respectiva a una tarea.</li>
            </ol>
        
        </div>    
    </>
        
    )
}
