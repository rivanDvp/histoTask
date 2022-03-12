import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useSelector } from 'react-redux'

export default function PrivateNavbar() {
  const { session, status } = useSelector(state => state.auth_state)
  const handleSignout=()=>{
    let r=confirm("¿Desea abandonar la pagina?")
    if(r){
      signOut({ callbackUrl: process.env.NEXT_PUBLIC_DOMAIN })
    }
  }
  return (

    <Navbar bg="ligth" expand="lg">

      <Navbar.Brand >
        <Link href='/'>
          <a className="a-navbar text-primary">histoTask</a>
          
        </Link>
      
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">


          <Link href='/'>
            <a className="a-navbar">Inicio</a>
          </Link>

          {/*es necesario este espacio en blanco para evitar que el texto se eleve al principio*/}

          <Link href='/MisTareas'>
            <a className='a-navbar'> Mis tareas</a>
          </Link>

          {/*es necesario este espacio en blanco para evitar que el texto se eleve al principio*/}
          
          <Link href='/help/home'>
            <a className='a-navbar'> Ayuda</a>
          </Link>

          {/*es necesario este espacio en blanco para evitar que el texto se eleve al principio*/}


          <span>
           
            <button
              className='btn-astext'
              onClick={handleSignout}
            >
              {
                status === "authenticated"
                  ? `${session.user.name}: `
                  
                  : "desconocido: "
              }
              <span className='text-info'>
                cerrar sesión
              </span>
            </button>

          </span>
          
        </Nav>

      </Navbar.Collapse>

      <style jsx>
        {`
          .a-navbar{
            text-decoration:none;
            color:grey;
            margin:5px
          }
          .a-navbar:hover{
            color:black;
          }
          .btn-astext{
            background:none;
            border:none;
            margin:5px;
            padding:0;
            cursor: pointer;
          }
        `}
      </style>
    </Navbar>
  )
}
