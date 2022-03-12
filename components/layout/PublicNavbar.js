import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'
export default function PublicNavbar() {
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
   
          <Link href='/help/home'>
            <a className='a-navbar'> Ayuda</a>
          </Link>

          <Link href='/auth/signin'>
            <a className='a-navbar'> Iniciar sesión</a>
          </Link>
          {/*es necesario este espacio en blanco para evitar que el texto se eleve al principio*/}



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
        `}
      </style>
    </Navbar>
  )
}
