import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import {PersonFill} from 'react-bootstrap-icons';
import {footer} from './components/utils';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListEdit from './components/ListEdit';
import ListCreateNew from './components/ListCreateNew';
import './App.css';
import MyLists from './components/MyLists';
import ListSaved from './components/ListSaved';

class LoggedIn extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Logged in page</Card.Title>
          <p>
            You are logged in as {this.props.user}. 
          </p>
          {this.props.stdOption()}
        </Card.Body>
      </Card>
    );
  }
}

class Home extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>WWIT Admin Home</Card.Title>
          <p>
            Administration for WWIT (What word is that)
          </p>
          {this.props.stdOption()}
          {footer()}
        </Card.Body>
      </Card>
    );
  }
}

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      auth:false,
      user:"login"
    }
  }  

  componentDidMount(){
    let that = this;
    fetch(process.env.REACT_APP_URL+'/api/user')
    .then(results => {
      return results.json()})
    .then(data => {
      let returned_user = data.response;
      if (returned_user !== "anonymous"){
        that.setState({
          auth:true,
          user: returned_user
        })
      }
    }).catch(function(error) {
      console.log('Fetch user has failed so assume anonymous - do nothing');
   });
  }

  standardOptions(){
    return (
      <>
        <NavDropdown.Item as={Link} to="/my-lists">My lists</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/create-new-list">Create new list</NavDropdown.Item>
        <NavDropdown.Item href="../">Return to play game</NavDropdown.Item>
      </>);
  }

  render() {
    return (
      <Router basename={`/${process.env.REACT_APP_SUB_BASE}`}>
        <Container>
          <Navbar bg="light" expand="lg">
            <NavDropdown title="Menu" id="basic-nav-dropdown" className="nav-item dropdown mr-auto">
              {this.standardOptions()}
              <NavDropdown.Divider />
              <NavDropdown.Item><PersonFill /> {this.state.user}</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand as={Link} to="/">WWWiT Admin</Navbar.Brand>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-new-list">
              <ListCreateNew 
                stdOption={this.standardOptions} 
                new={true} />
            </Route>
            <Route path="/item">
              <ListEdit 
                stdOption={this.standardOptions} 
                new={false} />
            </Route>            
            <Route path="/my-lists">
              <MyLists api="my-lists" />
            </Route>            
            <Route path="/logged-in">
              <LoggedIn 
                user={this.state.user} 
                stdOption={this.standardOptions}
                />
            </Route> 
            <Route path="/saved">
              <ListSaved 
                stdOption={this.standardOptions}
                />
            </Route>                                             
            <Route path="/">
              <Home stdOption={this.standardOptions} />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
