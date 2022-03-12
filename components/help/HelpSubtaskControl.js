import style from "./Help.module.css"
import tranlateHelpTopic from "../../auxiliarJS/tranlateHelpTopic"
import HelpNav from "./HelpNav"
import Image from "next/image"
import Image1 from "./images/control_subtarea.png"
export default function HelpSubtaskControl(props) {
    return (
    <>
     <HelpNav/>
    <div className={style["div-container"]}>
                   
            <h1 className={style["title"]}>Ayuda: {tranlateHelpTopic[props.topic]}</h1>

            <Image src={Image1} />
            <p>Este componente de control se despliega al dar click  en "Seleccionar" sobre la correspondiente subtarea, y tiene los siguientes elementos a destacar:</p>
            <ol>
                <li><b>Subtarea</b>, muestra el nombre de la subtarea.</li>
                <li><b>Subtarea id</b>, muestra el numero correlativo de la subtarea dentro de la tarea.</li>
                <li><b>Fecha de Inicio</b>, indica el momento en que la subtarea paso de "NOT_STARTED" a "STARTED".</li>
                <li><b>Lapso iniciado</b>, indica el ultimo momento en el que el estado de la subtarea paso de "PAUSED" a "STARTED"</li> 
                <li><b>Delta de tiempo</b>, indica el tiempo que ha transcurrido desde el momento del "lapso iniciado" hasta que se pause o finalice la subtarea.</li>
                <li><b>Tiempo acumulado</b>, basicamente es la suma de todos los "delta de tiempo" que se han registrado.</li>
                <li><b>Ejecutar</b>, este botón establece el estado de la subtarea en "STARTED", siempre y cuando el estado previo sea "NOT_STARTED" o "PAUSED"</li>
                <li><b>Pausar</b>, este botón establece el estado de la subtarea en "PAUSED", siempre y cuando el estado previo sea "STARTED"</li>
                <li><b>Finalizar</b>, este botón establece el estado de la subtarea en "FINISHED", siempre y cuando el estado previo sea "STARTED"</li>
                <li><b>Estado</b>, indica el estado de la respectiva subtarea</li>
                <li><b>Retomar</b>, este botón aparece si el estado de la subtarea es "FINISHED", al darle click pondrá el estado en "PAUSED"</li>
                <li><b>Tiempo total</b>,  aparece si el estado de la subtarea es "FINISHED", es la suma del "tiempo acumulado" y el ultimo "delta de tiempo", esto es así porque al finalizar la subtarea no se actualiza el "tiempo acumulado." </li>
            </ol>
        
        </div>    
    </>
        
    )
}
