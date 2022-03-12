import Layout from "../../components/layout/Layout";
import TaskEditor from "../../components/task_editor/TaskEditor";
import { useRouter } from "next/router"
import { useEffect } from "react";
import { tryLoadExistingTask } from "../../store/task_in_edition/actions";
import { useDispatch,useSelector} from "react-redux";

export default function nueva_tarea() {

    const router = useRouter()
    const dispatch=useDispatch()
    const { _id } = router.query;
    const {status}=useSelector(state =>state.auth_state )
    useEffect(()=>{
        if(status==="authenticated"){
            dispatch(tryLoadExistingTask(_id))
        }
    },[status])

    return (
        <Layout>
            <TaskEditor/>
        </Layout>
    )
}
