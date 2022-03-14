import style from "./Help.module.css"
import translateHelpTopic from "../../auxiliarJS/tranlasteHelpTopic"
import HelpNav from "./HelpNav"
import Image from "next/image"
import Image1 from "./images/editor_de_tareas.svg"
export default function HelpTaskEditor(props) {
    return (
    <>
   <HelpNav/>
    <div className={style["div-container"]}>
    
            <h1 className={style["title"]}>Ayuda: {translateHelpTopic[props.topic]}</h1>

            <Image src={Image1} />
            <p>El editor de tareas tiene los siguientes elementos a destacar:</p>
            <ol>
                <li><b>Nombre de la tarea</b>, en este campo se asigna el nombre que identificara a la tarea.</li>
                <li><b>Agregar</b>, este botón permite agregar una subtarea a la tarea principal, con un máximo de 10. Para hacerlo efectivo es necesario dar click en Guardar </li>
                <li><b>Nuevo</b>, este botón genera una nueva tarea en blanco, independiente de la actual.</li>
                <li><b>Guardar</b>, este botón permite guardar y/o actualizar la información de la tarea en la base de datos
                es importante destacar que el proceso de guardado no se ejecuta automaticamente, por lo que siempre es necesario que el usuario este pendiente de guardar los registros que vaya generando </li>
                <li> <b>Etiquetas</b>, este botón despliega la utilidad que permite agregar y/o eliminar etiquetas. Dichas etiquetas son las que permiten organizar el registro de las tareas.</li>
                <li> <b>Nombre de la subtarea</b>, campo donde se agrega en nombre que identifica a la subtarea.</li>
                <li><b>Descripción de la subtarea</b>, campo donde se agrega la descripción de la subtarea.</li>
                <li> <b>Estado</b>, es un indicador que refleja el estado actual de la subtarea, las cuales pueden ser:
                    <ul>
                    <li>NOT_STARTED: no iniciado.</li>
                    <li>STARTED: iniciado.</li>
                    <li>PAUSED: pausado.</li>
                    <li>FINISHED: finalizado.</li>
                    </ul>
                </li>
                <li><b>Borrar</b>, remueve la subtarea de la tarea principal. Para hacerlo efectivo es necesario dar click en Guardar.</li>
                <li><b>Seleccionar</b>, despliega la utilidad de control de tareas, la cual permite cambiar el estado de las subtareas.</li>
                <li><b>Subir</b>, botón para reordenar, lo hace ascendiendo la posición de la respectiva subtarea.</li>
                <li><b>Bajar</b>, botón para reordenar, lo hace  descendiendo la posición de la respectiva subtarea.</li>
            </ol>
        
        </div>    
    </>
        
    )
}
