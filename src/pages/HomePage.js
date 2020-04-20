import React from 'react';
import Card from 'react-bootstrap/Card';
import StdOptions from '../components/StdOptions'
import {footer} from '../components/utils';

const HomePage = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>WWIT Admin Home</Card.Title>
        <p>
          Administration for WWIT (What word is that)
        </p>
        <StdOptions />
        {footer()}
      </Card.Body>
    </Card>
  );
}

export default HomePage;