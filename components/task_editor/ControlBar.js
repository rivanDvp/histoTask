import style from './ControlBar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { runSubtask, pauseSubtask, finishSubtask, updateTimer,retakeSubtask } from '../../store/task_in_edition/actions';

export default function ControlBar() {
    const { id, name, status, start_dates, pause_dates,finish_date } = useSelector(state => state.task_in_edition.run)
    const timer = useSelector(state => state.task_in_edition.timer);
    const dispatch = useDispatch();

    const handleRun = () => {
        let r = window.confirm('¿Desea ejecutar la subtarea?')
        if (!r) { return }
        let timerID = setInterval(() => {
            let last_update = Date.now();
            return dispatch(updateTimer(last_update))
        }, 1000)
        let start_date = new Date().getTime()
        dispatch(runSubtask(id, start_date, timerID));
    }
    const handlePause = () => {
        let r = window.confirm('¿Desea pausar la subtarea?')
        if (!r) { return }
        let pause_date = new Date().getTime()
        clearInterval(timer.id)
        dispatch(pauseSubtask( id, pause_date));
    }

    const handleFinish = () => {
        let r = window.confirm('¿Desea finalizar la subtarea?')
        if (!r) { return }
        clearInterval(timer.id)
        let finish_date = new Date().getTime()

        dispatch(finishSubtask(id, finish_date));
    }

    const handleRetake=()=>{
        let r = window.confirm('¿Desea Retomar la subtarea?')
        if(!r){return}
        dispatch(retakeSubtask(id))

    }
    const myDateToString = (time) => {
        let date = new Date(time);
        let year = date.getFullYear();
        let month = `0${date.getMonth() + 1}`.slice(-2);
        let day = `0${date.getDate()}`.slice(-2);
        let localTime = date.toLocaleTimeString()
        return `${year}/${month}/${day} ${localTime}`

    }
    const myTimeToString = (time) => {
        let rawSeconds = Math.floor(time / 1000);
        let hours = Math.floor(rawSeconds / 3600);
        let minutes = Math.floor((rawSeconds - hours * 3600) / 60);
        let seconds = rawSeconds - hours * 3600 - minutes * 60;
        if (hours < 0 || minutes < 0 || seconds < 0) {
            return '00:00:00'
        } else {
            return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

        }
    }

    const calculateAccumulatedTime = (pause_dates, start_dates) => {
        let numberOfDates = pause_dates.length;
        let time = 0;
        for (let i = 0; i < numberOfDates; i++) {
            time += pause_dates[i] - start_dates[i]
        }
        return myTimeToString(time)
    }
    const calculateFinishTotalTime=(pause_dates,start_dates,finish_date)=>{
        let endDates=[...pause_dates,finish_date];
        return calculateAccumulatedTime(endDates,start_dates)
    }
    return (
        <div className={style['control-bar']}>
            <div className={style['indicators']}>
                <p>Subtarea:<b>{name}</b></p>
                <p>Lapso iniciado:<b>{
                    start_dates.length === 0
                        ? '--/--/--'
                        : myDateToString(start_dates.slice(-1)[0])
                }</b></p>

                <p>Subtarea id:<b>{id}</b></p>
                <p>Delta de tiempo:<b>{
                    /*timer.last_update<(start_dates.length===0?1:start_dates.slice(-1)[0])*/
                    status === 'NOT_STARTED'
                        ? '--:--:--'
                        : myTimeToString(timer.last_update - start_dates.slice(-1)[0])
                }</b></p>

                <p>Fecha de inicio:<b>{
                    start_dates.length === 0
                        ? '--/--/--'
                        : myDateToString(start_dates[0])
                }</b></p>
                <p>Tiempo acumulado:<b>{
                    pause_dates.length === 0
                        ? '--:--:--'
                        : calculateAccumulatedTime(pause_dates, start_dates)
                }</b></p>
            </div>
            <hr />
            Controles de registro:{' '}
            {
                status === 'FINISHED'
                    ? <span>
                        <button
                            onClick={handleRetake}
                            className='btn-primary'
                        >
                            Retomar</button>{' | '}
                    </span>
                    : <span>
                        <button className="btn-primary"
                            onClick={handleRun}
                        >Ejecutar</button>{' | '}

                        <button className="btn-warning"
                            onClick={status === 'NOT_STARTED' ?
                            () => alert('Primero se debe de iniciar la tarea')
                            :handlePause}
                        >
                            Pausar</button>{' | '}
                        <button className="btn-danger"
                            onClick={handleFinish}
                        >Finalizar</button>{' | '}


                    </span>

            }
            <span className="text-primary">Estado: <b>{status}</b></span>
            {
                status==='FINISHED'
                ?<>
                {' | '}<span className="text-primary">Tiempo total:
                <b>
                    {calculateFinishTotalTime(pause_dates,start_dates,finish_date)}
                </b>
                </span>
                </>
                :""
            }
        </div>
    )
}
