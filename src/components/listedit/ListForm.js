import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
/*
CURRENTLY NOT USED!
Need to separate form from state management and add in modal alert
*/
const ListForm = ({question, showQ, response}) => {

return (
  <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
    <Form.Row><Col>
      <Form.Group controlId="formName">
        <Form.Label>List name</Form.Label>
        <Form.Control 
          placeholder="eg Simpson characters" 
          required
          type="text"
          onChange={this.updateName}
          value={this.state.name}
        />
        <Form.Control.Feedback type="invalid">
          You must select a name
        </Form.Control.Feedback>
      </Form.Group>
    </Col></Form.Row>
    <Form.Row><Col>
      <Form.Group controlId="formDescription">
        <Form.Label>List description</Form.Label>
        <Form.Control 
          as="textarea" 
          rows="2"
          required
          type="text"
          onChange={this.updateDescription}
          value={this.state.description}
        />
        <Form.Control.Feedback type="invalid">
          A short description helps
        </Form.Control.Feedback>
      </Form.Group>
    </Col></Form.Row>
    <Form.Row>
      <Col>
      <Form.Group controlId="formItems">
        <Form.Label>List items (return or comma)</Form.Label>
        <Form.Control 
          as="textarea" 
          rows="4"
          required
          type="text"
          onChange={this.updateItems}
          value={this.state.items}
        />
        <Form.Control.Feedback type="invalid">
          Add some list words!
        </Form.Control.Feedback>
      </Form.Group>
      </Col>
    </Form.Row>
    <Form.Row>
      <Form.Group id="formPrivate">
        <Form.Check 
          type="checkbox" 
          checked={this.state.private}
          label="Tick to keep list private" 
          onChange={this.updatePrivate}
        />
      </Form.Group>
    </Form.Row>
    <Button type="submit">Save</Button>{" "}{this.props.new?"":<Button onClick={()=>this.handleDelete()} variant="danger">Delete</Button>}
  </Form>
)

}
export default ListForm;