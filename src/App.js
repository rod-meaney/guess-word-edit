import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {PersonFill} from 'react-bootstrap-icons';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import GamesListMyPage from './pages/GamesListMyPage';
import HomePage from './pages/HomePage';
import ListSavedPage from './pages/ListSavedPage';
import LoggedInPage from './pages/LoggedInPage';
import ListEditNewPage from './pages/ListEditNewPage';
import ListEditExistingPage from './pages/ListEditExistingPage';
import StdOptions from './components/StdOptions';
import UserService from './services/UserService';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      auth:false,
      user:"login"
    }
    this.userService = new UserService();
  }  

  retrievedUser(rUser) {
    //Only update user if the fetch returns something diffenerent than the default user
    if (rUser !== this.state.user){this.setState({auth:true,user:rUser})}
  }

  componentDidMount(){
    this.userService.getUser({defaultUser:this.state.user, gotUser:this.retrievedUser.bind(this)});
  }

  render() {
    return (
      <Router basename={`/${process.env.REACT_APP_SUB_BASE}`}>
        <Container>
          <Navbar bg="light" expand="lg">
            <NavDropdown title="Menu" id="basic-nav-dropdown" className="nav-item dropdown mr-auto">
              <StdOptions />
              <NavDropdown.Divider />
              <NavDropdown.Item><PersonFill /> {this.state.user}</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Brand as={Link} to="/">WWWiT Admin</Navbar.Brand>
          </Navbar>
          {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/create-new-list">
              <ListEditNewPage new={true} />
            </Route>
            <Route path="/item">
              <ListEditExistingPage new={false} />
            </Route>            
            <Route path="/my-lists">
            <GamesListMyPage api="my-lists" function="edit/item" title="My games admin" />
            </Route>
            <Route path="/logged-in">
              <LoggedInPage user={this.state.user} />
            </Route> 
            <Route path="/saved">
              <ListSavedPage />
            </Route>                                             
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Container>
      </Router>
    );
  }
}

export default App;
