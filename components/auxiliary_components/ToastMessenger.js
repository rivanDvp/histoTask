import Toast from 'react-bootstrap/Toast'
/*
actionClose
show,
type
message
*/
export default function ToastMessenger(props) {
    return (
        <Toast onClose={props.actionClose} show={props.message.pending} 
        delay={4000} autohide
        bg={props.message.type==='info'?'ligth':'danger'}
        >
        <Toast.Header>
          <strong className="me-auto">histoTask dice:</strong>
          <small>{props.message.type}</small>
        </Toast.Header>
        <Toast.Body>{props.message.message}</Toast.Body>
      </Toast>
    )
}
