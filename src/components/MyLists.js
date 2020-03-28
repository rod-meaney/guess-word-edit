import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import {ChevronRight} from 'react-bootstrap-icons';

class MyListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      key:this.props.id,
      description:this.props.description,
      name:this.props.name,
      private:this.props.private
    }
  } 
  render() {
    return(
      <ListGroup.Item>{this.state.name}
        <span className="float-right">
        <Link to={`/item?id=${this.state.key}`}>
          <ChevronRight />
          </Link>
        </span>
      </ListGroup.Item>
      
    );
  }
}

class MyLists extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      games:[]
    }
  }

  componentDidMount(){
    let that = this;
    fetch(process.env.REACT_APP_URL+`/${process.env.REACT_APP_SUB_BASE}/api/${this.props.api}`)
    .then(results => {
      return results.json()})
    .then(data => {
      that.setState({games:data}); 
    }).catch(function(error) {
      console.log('Fetch has failed so defaulting in some data for local testing.');
      let data = [{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"}];
      that.setState({games:data}); 
   });
  }

  noItems() {
    return this.state.games.length===0?(<ListGroup.Item>Currently no items</ListGroup.Item>):"";
  }

  render() {
    return (
      <Card>
        <Card.Body>
          <ListGroup>
            {this.state.games.map((item) => <MyListItem 
                                              id={item.key}
                                              key={item.key}
                                              name={item.name}
                                              description={item.description}
                                              private={item.private}
                                              />)}
            {this.noItems()}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default MyLists;