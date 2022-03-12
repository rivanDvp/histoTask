import Layout from "../../components/layout/Layout"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tryToGetAllTasks } from "../../store/task_manager/actions";
import { Chart } from "../../components/stats/Chart";
import Summary from "../../components/stats/Summary";
export default function Estadisticas() {
    const router = useRouter()
    let { status } = useSelector(state => state.auth_state)
    let { tasks } = useSelector(state => state.task_manager)
    const dispatch = useDispatch()
    let { _id } = router.query;

    useEffect(() => {
        if (tasks.length === 0 && status === "authenticated") {
            dispatch(tryToGetAllTasks())
        }
    }, [status])
    const task = tasks.filter(ts => ts._id === _id)[0]
    return (
        <Layout>
            <h2>Estadísticas</h2>
            <hr />
            
            {task
                ? <>
                 <h2 className="text-primary">{task.task_name}</h2>
                <Summary
                subtasks={task.subtasks}
                tags={task.tags}
                />
                   
                    {task.subtasks.map(st => {
                        let { id, name, status: stStaus, start_dates,pause_dates,finish_date } = JSON.parse(st);
                        return (<div >
                            <h3>{`#${id}- ${name}`}</h3>
                            <p>{`Estado actual: ${stStaus}`}</p>
                            {stStaus==="FINISHED"
                                ?<Chart
                                start_dates={start_dates}
                                pause_dates={[...pause_dates,finish_date]}
                                name={name}     
                             />
                             :<Chart
                             start_dates={start_dates}
                             pause_dates={pause_dates}
                             name={name}     
                          />
                            }
                           
                           <hr/>
                        </div>)
                    })}
                </>
                : <></>
            }
        </Layout>
    )
}
