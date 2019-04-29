import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import News from "./components/News";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/CustomNavbar";
import Calendar from "./components/Calendar";
import Chat from "./components/Chat";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/news" component={News} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Calendar" component={Calendar} />
          <Route path="/Chat" component={Chat} />
        </div>
      </Router>
    );
  }
}

export default App;
