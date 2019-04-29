import React, { Component } from "react";
import { Navbar, Nav , NavItem, NavDropdown, MenuItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CustomNavbar.css";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">NeighborHub</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home
                  <span className="sr-only">(current)</span></a>
                  </li>
              <li className="nav-item">
                <a className="nav-link" href="/About">
                  About</a>
                <a className="nav-link" href="/News">
                  News</a>
                <a className="nav-link" href="/Chat">
                  Chat</a>
                <a className="nav-link" href="/Login">
                  Login</a>
                <a className="nav-link" href="/Signup">
                  Signup</a>
                <a className="nav-link" href="/Calendar">
                  Calendar</a>
              </li>
            </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>)
    }
}

export default Navigation;
/*import React, { Component } from "react";
import { Navbar, Nav , NavItem, NavDropdown, MenuItem } from "react-bootstrap";
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
*/
