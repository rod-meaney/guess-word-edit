import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class ListSaved extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          Well Saved!
        </Card.Body>
      </Card>
    );
  }
}

class CreateNewList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      validated:false,
      saved:false,
      name:"",
      description:"",
      items:"",
      private: false
    }
  }

  handleSubmit = event => {
    const form = event.currentTarget;
    console.log(this.state);
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      fetch(process.env.REACT_APP_URL+'/edit/api/save', {
        method: 'POST',
        body: JSON.stringify(this.state),
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        console.log(jsonData);
        this.setState({saved:true});
      });
    }
    this.setState({validated:true}); //Don't undert=stand how for validation works, but it isnice magic juju
    event.preventDefault(); //We actuyally never want it to submit, we handle success in the else branch
  };

  updateName = (event) => {event.preventDefault(); this.setState({name:event.target.value});}
  updateDescription = (event) => {event.preventDefault(); this.setState({description:event.target.value});}
  updateItems = (event) => {
    event.preventDefault(); 
    //Make return characters comma seperated and ensure all words are trimmed
    let allItems = event.target.value.replace(/\r?\n/g, ",").trim().split(",");
    allItems = allItems.map(x => x.trim());
    this.setState({items:allItems.join(",")});
  }
  updatePrivate = (event) => {this.setState({private:event.target.checked});}

  render() {
    if (this.state.saved){
      return (<ListSaved />);
    } else {
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
                    onChange={this.updateName}
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
                    onChange={this.updateDescription}
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
                    onChange={this.updateItems}
                  />
                  <Form.Control.Feedback type="invalid">
                    Add some list words!
                  </Form.Control.Feedback>
                </Form.Group>
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
              <Button type="submit">Save</Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }

  }
}

export default CreateNewList;