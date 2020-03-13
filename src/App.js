import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateNewList from './components/CreateNewList'
import './App.css';

class Home extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Basic Home Page</Card.Title>
          <Card.Img variant="top" src='https://pngimage.net/wp-content/uploads/2018/05/edit-a-png-7.png' style={{ width: '18rem' }} />
          <p>
            <br />
            A game of guessing fun for all the family and your crazy friends.
          </p>
          <Link to="/temp-play"><Button variant="primary">Play time</Button></Link>
        </Card.Body>
      </Card>
    );
  }
}

class App extends React.Component{
  render() {
    return (
      <Router basename={'/edit'}>
        <Container>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/">Learning!</Navbar.Brand>
            <NavDropdown title="Options" id="basic-nav-dropdown" className="nav-item dropdown ml-auto">
              <NavDropdown.Item as={Link} to="/">My lists home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/create-new-list">Create new list</NavDropdown.Item>
              <NavDropdown.Item href="../">Guess Words Home</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-new-list">
              <CreateNewList />
            </Route>                       
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
