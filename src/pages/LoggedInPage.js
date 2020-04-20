import React from 'react';
import Card from 'react-bootstrap/Card';
import StdOptions from '../components/StdOptions'

const LoggedInPage = ({user}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Logged in page</Card.Title>
        <p>
          You are logged in as {user}. 
        </p>
        <StdOptions />
      </Card.Body>
    </Card>
  );
}

export default LoggedInPage;