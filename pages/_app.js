import 'bootstrap/dist/css/bootstrap.min.css';//this have to be here to work.
import { wrapper } from '../store/store'
import {SessionProvider} from 'next-auth/react'

const WrappedApp=({Component,pageProps})=>{
  return (
    <SessionProvider
      session={pageProps.session}
    >
    <Component {...pageProps}/>
    </SessionProvider>
  )
 
}
/*
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}*/

export default wrapper.withRedux(WrappedApp)
