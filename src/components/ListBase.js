import React from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {Redirect} from "react-router-dom";

class ListBase extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded_id:"",
      validated:false,
      saved:false,
      name:"",
      description:"",
      items:"",
      private: false
    }
  }

  componentDidMount() {
    //this is when we are updating - not needed for new
    if (!this.props.new){
      let parts = window.location.href.split('?id=');
      let id = parts[parts.length-1];
      let that = this;
      fetch(`${process.env.REACT_APP_URL}/${process.env.REACT_APP_SUB_BASE}/api/item?id=${id}`)
      .then(results => {return results.json()})
      .then(data => { 
        that.setState({loaded_id: id, 
                        name: data.name, 
                        description: data.description, 
                        items: data.items,
                        private: data.private});
      }).catch(function(error) {
        console.log('Fetch has failed so defaulting in some data for local testing.');
        let data = {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr", "items": "Abyssinian,Aegean,American Bobtail,American Curl,American Shorthair,American Wirehair,Aphrodite Giant,Arabian Mau,Asian cat,Asian Semi-longhair,Australian Mist,Balinese,Bambino,Bengal,Birman,Bombay,Brazilian Shorthair,British Longhair,British Shorthair,Burmese,Burmilla,California Spangled,Chantilly-Tiffany,Chartreux,Chausie,Colourpoint Shorthair,Cornish Rex,Cymric,Longhaired Manx,Cyprus,Devon Rex,Donskoy,Don Sphynx,Dragon Li,Dwelf,Egyptian Mau,European Shorthair,Exotic Shorthair,Foldex,German Rex,Havana Brown,Highlander,Himalayan,Japanese Bobtail,Javanese,Khao Manee,Korat,Korean Bobtail,Korn Ja,Kurilian Bobtail\u00a0or,Kuril Islands Bobtail,LaPerm,Lykoi,Maine Coon,Manx,Mekong Bobtail,Minskin,Napoleon,Munchkin,Nebelung,Norwegian Forest Cat,Ocicat,Ojos Azules,Oregon Rex,Oriental Bicolor,Oriental Longhair,Oriental Shorthair,Persian,Peterbald,Pixie-bob,Ragamuffin,Ragdoll,Raas,Russian Blue,Russian White,Black,and Tabby,Sam sawet,Savannah,Scottish Fold,Selkirk Rex,Serengeti,Serrade Petit,Siberian,Neva Masquerade,Singapura,Snowshoe,Sokoke,Somali,Sphynx,Suphalak,Thai,Thai Lilac,Tonkinese,Toyger,Turkish Angora,Turkish Van,Ukrainian Levkoy,Wila Krungthep,York Chocolate"};
        that.setState({loaded_id: id, name: data.name, description: data.description, items: data.items, private: data.private});
      });
    }
  }

  handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      let api = '/edit/api/update';
      if (this.props.new) {api = '/edit/api/save';}
      fetch(process.env.REACT_APP_URL+api, {
        method: 'POST',
        body: JSON.stringify(this.state),
      }).then((response) => {
        return response.json();
      }).then((jsonData) => {
        this.setState({saved:true});
      });
    }
    this.setState({validated:true}); //Don't undert=stand how for validation works, but it is nice magic juju
    event.preventDefault(); //We actually never want it to submit, we handle success in the else branch
  };

  updateName = (event) => {event.preventDefault(); this.setState({name:event.target.value});}
  updateDescription = (event) => {event.preventDefault(); this.setState({description:event.target.value});}
  updateItems = (event) => {event.preventDefault(); this.setState({items:event.target.value});}
  updatePrivate = (event) => {this.setState({private:event.target.checked});}

  render() {
    if (this.state.saved){
      return (<Redirect to="/saved" />);
    } else {
      return (
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
              <Button type="submit">Save</Button>
            </Form>
          </Card.Body>
        </Card>
      );
    }
  }
}

export default ListBase;