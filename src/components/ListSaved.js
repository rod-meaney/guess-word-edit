import React from 'react';
import Card from 'react-bootstrap/Card'

class ListSaved extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    return (
      <Card>
        <Card.Body>
          <p>
          Well Saved!
          </p>
          {this.props.stdOption()}
        </Card.Body>
      </Card>
    );
  }
}

export default ListSaved;