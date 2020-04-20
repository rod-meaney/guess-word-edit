import React from 'react';
import Card from 'react-bootstrap/Card';
import StdOptions from '../components/StdOptions'

const ListSavedPage = () => {
  let parts = window.location.href.split('?msg=');
  let msg = decodeURI(parts[parts.length-1]);
  return (
    <Card>
    <Card.Body>
      <p>{msg}</p>
      <StdOptions />
    </Card.Body>
  </Card>
  );
}

export default ListSavedPage;