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
import './App.css';

class TempPlay extends React.Component {
  render() {
    return (
      <Card>
        <Card.Body>
          Whatever! A general space to practise
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
              <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/temp-play">Play time</NavDropdown.Item>
            </NavDropdown>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/temp-play">
              <TempPlay />
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
