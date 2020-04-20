import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Redirect} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import ListService from '../../services/ListService';

class ListEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //Form handling
      validated:false,
      saved:false,
      saving:false,
      saveResponse:"",
      //Form items
      loaded_id:"", //only used fro update
      name:"",
      description:"",
      items:"",
      private: false,
    }
    this.listService = new ListService();
  }

  handleGetListError(error){
    //Not really expecting this so have not don much about it
    alert(error);
  }

  handleGetList(data) {
    this.setState(
      {loaded_id: data.key, 
        name: data.name, 
        description: data.description, 
        items: data.items,
        private: data.private}
    )
  }
  
  componentDidMount() {
    //this is when we are updating - not needed for new
    if (!this.props.new){
      let parts = window.location.href.split('?id=');
      let id = parts[parts.length-1];
      this.listService.getList({key:id, result:this.handleGetList.bind(this),error:this.handleGetListError.bind(this)});
    }
  }

  handleReturnSubmit(){this.setState({saving:false,saved:true,saveResponse:"Your list was saved successfully."});}

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      this.listService.saveOrUpdateList({save:this.props.new, form:this.state, result:this.handleReturnSubmit.bind(this)});
    }
    this.setState({validated:true}); //Don't undert=stand how for validation works, but it is nice magic juju
    event.preventDefault(); //We actually never want it to submit, we handle success in the else branch
  };

  handleReturnDelete(){this.setState({saving:false,saved:true,saveResponse:"Your list was deleted successfully."});}
  handleDelete() {
    if (window.confirm("This will delete the list permanently.  Are you sure?")){
      this.listService.deleteList({key:this.state.loaded_id, result:this.handleReturnDelete.bind(this)});
    }
  }
  
  updateName = (event) => {event.preventDefault(); this.setState({name:event.target.value});}
  updateDescription = (event) => {event.preventDefault(); this.setState({description:event.target.value});}
  updateItems = (event) => {event.preventDefault(); this.setState({items:event.target.value});}
  updatePrivate = (event) => {this.setState({private:event.target.checked});}

  render() {
    if (this.state.saved){
      if (this.state.searching) return 
      return (<Redirect to={`/saved?msg=${this.state.saveResponse}`} />);
    } else {
      return (
        <>
        {this.state.saving?<div><br /><center><span>Saving.. </span> <Spinner style={{verticalAlign:"middle"}} animation="grow"/></center></div>:""}
        <Card>
          <Card.Body>
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
          </Card.Body>
        </Card>
        </>
      );
    }
  }
}

export default ListEdit;