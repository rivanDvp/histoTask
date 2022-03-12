import Head from 'next/head'
import PrivateNavbar from './PrivateNavbar'
import PublicNavbar from './PublicNavbar'
import isAPrivatePath from '../../auxiliarJS/isAPrivatePath'
import MyFooter from './MyFooter'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { setTheCurrentStatus } from '../../store/auth_state/actions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'


export default function Layout({ children }) {
  const { status: statusState } = useSelector(state => state.auth_state)
  const { data: session, status } = useSession()
  const dispatch = useDispatch()
  const router = useRouter()
  
  useEffect(() => {
    dispatch(setTheCurrentStatus(status, session))
    if (status === "unauthenticated" && isAPrivatePath(router.pathname)) {
      router.push("/")
    }
  }, [status])

  

  return (
    <>
      <Head>
        <title>histoTask app</title>
      </Head>
      <main>
        {
          statusState === 'authenticated'
            ? <PrivateNavbar />
            : <PublicNavbar />

        }
       
        <hr />
        {
          status === "unauthenticated" && isAPrivatePath(router.pathname)
          ? <></>
          :children
        }
        <MyFooter/>
                

      </main>
    </>
  )
}

/*<NavbarComponent/>*/