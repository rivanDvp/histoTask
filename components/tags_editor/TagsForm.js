import Modal from 'react-bootstrap/Modal'


export default function TagsForm(props) {
  const handleWrite = (e) => {
    let description = e.target.value;
    props.actionWrite(description)
  }
  const handleAdd = () => {
    props.actionAdd()
  }
  return (
    <>
      <Modal show={props.form.show} onHide={() => props.actionClose()}>
        <Modal.Header closeButton closeLabel='Close'>
          <Modal.Title className='bg bg-ligth'>Nueva {props.form.type === 'category' ? 'Categoria' : 'Etiqueta:'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Descripción:</label>
          <input
            onChange={handleWrite}
            placeholder="Escriba aquí..."
            value={props.form.description}
          />
        </Modal.Body>
        <Modal.Footer>
        <button className="btn btn-primary" onClick={handleAdd}>
            Agregar
          </button>
          <button className="btn btn-secondary" onClick={() => props.actionClose()}>
            Cancelar
          </button>

        </Modal.Footer>
      </Modal>

    </>
  )
}
