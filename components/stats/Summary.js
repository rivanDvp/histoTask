import getWorkTime from "../../auxiliarJS/getWorkTime"
import msToString from "../../auxiliarJS/msToString"
import style from "./Summary.module.css"
export default function Summary(props) {
    const totalWorktimeTask = () => {
        let timeWorkByST = props.subtasks.map(st => {
            let { start_dates, pause_dates,finish_date, status:stStatus, } = JSON.parse(st)
            if (stStatus === 'NOT_STARTED') {
                return 0
            }else if(stStatus === 'FINISHED'){
                let workTimeArr = getWorkTime(start_dates, [...pause_dates,finish_date])
                return workTimeArr.reduce((total, amount) => total + amount)     
            }else{
                let workTimeArr = getWorkTime(start_dates, pause_dates)
            return workTimeArr.reduce((total, amount) => total + amount)
            }
            
        })
        let totalTimeInMs = timeWorkByST.reduce((total, amount) => total + amount)
        return msToString(totalTimeInMs)
    }
    const howManyInThisStatus=(status)=>{
        let filterSubtask=props.subtasks.filter((st)=>{
           let {status:stStatus}=JSON.parse(st)
           return stStatus===status 
        })
        return filterSubtask.length
    }
    return (
        <div className={style['div-container']}>
            <div className={style['div-boundary']}>
                <p className="text-primary"><b>Sumario</b></p>
                <ul>
                <li><b>Etiquetas:</b> {props.tags.join(', ')}</li>
                <li><b>Numero de subtareas:</b> {props.subtasks.length}</li>
                <li><b>Subtareas "No Comenzadas": </b>{howManyInThisStatus("NOT_STARTED")}</li>
                <li><b>Subtareas "Pausadas": </b>{howManyInThisStatus("PAUSED")}</li>
                <li><b>Subtareas "Finalizadas": </b>{howManyInThisStatus("FINISHED")}</li>

                
                <li><b>Tiempo total:</b> {totalWorktimeTask()}</li>
                </ul>
                
            </div>
        </div>
    )
}
