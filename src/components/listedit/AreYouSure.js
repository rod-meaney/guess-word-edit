import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
const AreYouSure = ({question, showQ, response}) => {
  const [show, setShow] = useState(false);
  const handleClose = (answer) => {setShow(false); response(answer);}
  setShow(showQ);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure</Modal.Title>
        </Modal.Header>
        <Modal.Body>{question}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={handleClose(true)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
export default AreYouSure;