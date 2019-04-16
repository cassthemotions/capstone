import React, { Component } from "react";
import { Grid, Col, Image } from "react-bootstrap";
import "./About.css";

export default class About extends Component {
  render() {
    return (
      <div>
        <Image src="assets/dog-people.jpg" className="header-image" />
        <Grid>
          <Col xs={12} sm={8} smOffset={2}>
            <Image
              src="assets/shakinghands.jpg"
              className="about-profile-pic"
              rounded
            />

            <h4>
              NeighborHub is a collaboration between Muyuan Li and Joseph Tu.
            </h4>

            <p>
              This application intends to help apartment management companies
              solve the problem of communication hardship by providing solutions
              of a web application in order to integrate multiple functions such
              as event planning and shift scheduling.
            </p>
          </Col>
        </Grid>
      </div>
    );
  }
}
