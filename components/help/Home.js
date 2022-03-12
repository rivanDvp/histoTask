import style from "./Help.module.css"
import tranlateHelpTopic from "../../auxiliarJS/tranlateHelpTopic"
import HelpNav from "./HelpNav"

export default function Home(props) {
    return (
    <>
     <HelpNav/>
    <div className={style["div-container"]}>
           
            <h1 className={style["title"]}>Ayuda: {tranlateHelpTopic[props.topic]}</h1>
            <p><b>histoTask</b> es una web app que tiene como principal objetivo el ser una herramienta que
                facilite la elaboración de bitácoras de trabajo haciendo uso del siguiente conjunto de caracteriticas:                 
            </p>
            <ul>
                <li>Registro de tareas</li>
                <li>Subdivisión de tareas complejas en actividades más sencillas (subtareas). </li>
                <li>Registro del tiempo de ejecución de las subtareas. </li>
                <li> Clasificación de las tareas en base a un sistema de categorias y etiquetas. </li>
                <li>Análisis de las sesiones de trabajo.</li>
            </ul>
        <p>
            El funcionamiento de la aplicación es bastante sencilla, y se ha desarrollado de tal manera que sea lo más
            intuitiva posible, sin embargo hay que mencionar que la versión actual de la aplicación es una versión <em>"alfa"</em> , y por tanto,  esta sometida a un proceso de mejora continua.
 
        </p>
        <p>
            Además cabe mencionar que actualmente esta aplicación utiliza servicios web gratuitos, si bien esto permite dar los primeros pasos, tambien conlleva una operación limitada.
            Por lo cual no se descarta que en futuras versiones se busque monetizar la app a través de la venta de espacio para publicidad, entre otros. 

        </p>
       
        </div>    
    </>
        
    )
}
