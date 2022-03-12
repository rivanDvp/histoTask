import { signIn } from "next-auth/react"
import logoGoogle from "./logoGoogle.png"
import logoGithub from "./logoGithub.png"
import Image from "next/image"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { tryToGetProviders } from "../../store/auth_state/actions"
import style from "./SigninComponent.module.css"

const images={
  google:logoGoogle,
  github:logoGithub
}

export default function SigninComponent() {
  const { providers } = useSelector(state => state.auth_state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tryToGetProviders())
  }, [])


  return (
    <div className={style["container"]}>
      <div className={style["pedestal"]}>
        <h2 className="text-primary">Porfavor Identificarse</h2>


        {Object.values(providers).map((provider) => (
          <div 
          className={style["provider-pad"]}
          key={provider.name}>
             <span className={style["div-image"]}>
            <Image
                  className={style["logos"]}
                  src={images[provider.id]}
                  alt={`logo de ${provider.id}`}
                  width="30px"
                  height="30px"
                />     
              </span>   
            <button
              className="btn btn-primary"
              onClick={() => signIn(provider.id, { callbackUrl: process.env.NEXT_PUBLIC_DOMAIN })}>
                   
              Iniciar Sessión con {provider.name}
            </button>
          </div>
        ))}

      </div>
    </div>

  )
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

