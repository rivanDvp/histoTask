import Home from "./Home"
import HelpTaskManager from "./HelpTaskManager";
import HelpTaskEditor from "./HelpTaskEditor";
import HelpSubtaskControl from "./HelpSubtaskControl";
import HelpTutorials from "./HelpTutorials";
import style from "./Help.module.css"


export default function Help(props) {

    //acá voy a poner un switch para poder indexar la pagina de ayuda correpondiente
    switch(props.topic){
        case 'home':
            return <Home topic={props.topic}/>
        case 'task_manager':
            return <HelpTaskManager topic={props.topic}/>
        case 'task_editor':
            return <HelpTaskEditor topic={props.topic}/>
        case 'subtask_control':
                return <HelpSubtaskControl topic={props.topic}/>
        case 'tutorials':
                return  <HelpTutorials topic={props.topic}/>
        default:
            return (
                <div className={style["div-container"]}>
                    <h1>Lo sentimos, el tema "{props.topic}" no existe...</h1>
                </div>
            )
    }
    
}
