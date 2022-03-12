import { useRouter } from "next/router"
import Layout from "../../components/layout/Layout"
import Help from "../../components/help/Help"

export default function Topic() {
const router = useRouter()
    return (
        <Layout>
             <div>
           <Help topic={router.query.topic}/> 
        </div>
        </Layout>
       
    )
}
