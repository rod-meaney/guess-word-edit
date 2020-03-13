import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class CreateNewList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      validated:false
    }
  }

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.setState({validated:true});
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group controlId="formName">
                <Form.Label>List name</Form.Label>
                <Form.Control 
                  placeholder="eg Simpson characters" 
                  required
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  You must select a name
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formDescription">
                <Form.Label>List description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows="2"
                  required
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  A short description helps
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="formItems">
                <Form.Label>List items (return or comma)</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows="4"
                  required
                  type="text"
                />
                <Form.Control.Feedback type="invalid">
                  Add some list words!
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group id="formPrivate">
                <Form.Check type="checkbox" label="Tick to keep list private" />
              </Form.Group>
            </Form.Row>
            <Button type="submit">Submit form</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateNewList;