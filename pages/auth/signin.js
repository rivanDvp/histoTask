import SigninComponent from "../../components/signinComponent/SigninComponent"

export default  function SignIn() {
 
  
 return (<SigninComponent/>)
}

// This is the recommended way for Next.js 9.3 or newer
// I have to re-write this function to integrate with Redux-wrapper

/*
export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
*/

