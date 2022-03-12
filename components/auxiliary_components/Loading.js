import Spinner from 'react-bootstrap/Spinner'

export default function Loading(props) {
    return (
        <>
        {props.loading?
        <div><Spinner animation="border" role="status" variant="info" size="sm">
      </Spinner> Cargando...</div>
        
      :<></>    
    }    
        </>
    )
}
