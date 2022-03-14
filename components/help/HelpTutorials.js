import style from "./Help.module.css"
import translateHelpTopic from "../../auxiliarJS/tranlasteHelpTopic"
import HelpNav from "./HelpNav"
import Image from "next/image"
import Image1 from "./images/editor_de_tareas.svg"

export default function HelpTutorials(props) {
    return (
    <>
     <HelpNav/>
    <div className={style["div-container"]}>
                   
            <h1 className={style["title"]}>Ayuda: {translateHelpTopic[props.topic]}</h1>
            <h2>Crear una tarea</h2>
            <iframe className={style["iframe"]} src="https://www.youtube.com/embed/FguHQXoaGQs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <h2>Gestionar etiquetas</h2>
            <iframe className={style["iframe"]} src="https://www.youtube.com/embed/D7z5OeKj_6s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
        </div>    
    </>
        
    )
}
