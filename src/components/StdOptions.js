import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom";

const StdOptions = () => {
  return (
    <>
      <NavDropdown.Item as={Link} to="/my-lists">My lists</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/create-new-list">Create new list</NavDropdown.Item>
      <NavDropdown.Item href="../">Return to play game</NavDropdown.Item>
    </>);
}

export default StdOptions;