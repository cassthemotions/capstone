import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

export default class CustomNavbar extends Component {
  render() {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">NeighborHub</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem
              eventKey={2}
              componentClass={Link}
              href="/about"
              to="/about"
            >
              About
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href="/news" to="/news">
              News
            </NavItem>
            <NavItem
              eventKey={4}
              componentClass={Link}
              href="/Login"
              to="/Login"
            >
              Login
            </NavItem>
            <NavItem
              eventKey={5}
              componentClass={Link}
              href="/Signup"
              to="/Signup"
            >
              Signup
            </NavItem>
            <NavItem
              eventKey={6}
              componentClass={Link}
              href="/Calendar"
              to="/Calendar"
            >
              Calendar
            </NavItem>
            <NavItem eventKey={7} componentClass={Link} href="/Chat" to="/Chat">
              Chat
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
