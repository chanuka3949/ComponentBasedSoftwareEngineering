import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import axios from "axios";
import "./UserForm.css";

class UserForm extends Component {
  state = {
    username: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    image: "",
    contentType: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    state: "",
    contactNumber: "",
    postalCode: "",
  };

  handleInput = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };

  handleFileInput = (event) => {
    let nam = event.target.name;
    let val = event.target.files[0];
    this.setState({ [nam]: val });
  };

  clearInputs = () => {
    this.setState({
      username: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      image: "",
      contentType: "",
      address1: "",
      address2: "",
      city: "",
      country: "",
      state: "",
      contactNumber: "",
      postalCode: "",
    });
  };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData() {
    axios.get(`http://localhost:5000/api/users/csds`).then(
      (response) => {
        console.log(response);
        this.setState({
          username: response.data.username ?? "",
          email: response.data.email ?? "",
          firstName: response.data.firstName ?? "",
          middleName: response.data.middleName ?? "",
          lastName: response.data.lastName ?? "",
          contactNumber: response.data.contactNumber ?? "",
          image: response.data.imageData ?? "",
          contentType: response.data.contentType ?? "",
        });
      },
      (error) => {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    );
  }
  saveUserDetails = () => {
    let userData = {
      username: this.state.username,
      email: this.state.email ?? "",
      firstName: this.state.firstName ?? "",
      middleName: this.state.middleName ?? "",
      lastName: this.state.lastName ?? "",
      contactNumber: this.state.contactNumber ?? "",
    };
    axios.post(`http://localhost:5000/api/users/`, userData).then(
      (response) => {
        let file = this.state.image;
        if (file === undefined) return;
        let formData = new FormData();
        formData.append("file", file);
        formData.append("identifier", this.state.username);
        axios
          .post(`http://localhost:5000/api/files/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(
            (response) => {
              console.log("User Details Updated");
            },
            (error) => {
              if (error.response) {
                console.log(error.response.data.message);
              }
            }
          );
      },
      (error) => {
        if (error.response) {
          this.getProfileData();
          console.log(error.response.data.message);
        }
      }
    );
  };
  render() {
    return (
      <>
        <h2 className="page-title">User Profile</h2>
        <Form className="form">
          <Image
            className="user-image"
            src="data:image/<%=image.img.contentType%>;base64,
            <%=image.img.data.toString('base64')%>"
            roundedCircle
          />
          <Container>
            <Row>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstName"
                    type="text"
                    value={this.state.firstName}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    name="middleName"
                    type="text"
                    value={this.state.middleName}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastName"
                    type="text"
                    value={this.state.lastName}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={this.state.email}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Contact No</Form.Label>
                  <Form.Control
                    name="contactNumber"
                    type="text"
                    placeholder="+94123456789"
                    value={this.state.contactNumber}
                    onChange={this.handleInput}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Upload Picture</Form.Label>
                <Form.Control
                  name="image"
                  type="file"
                  onChange={this.handleFileInput}
                />
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button
                  variant="success"
                  as="input"
                  type="button"
                  value="Save"
                  className="button-submit"
                  onClick={this.saveUserDetails}
                />
                <Button
                  as="input"
                  type="button"
                  value="Clear"
                  className="button-reset"
                  onClick={this.clearInputs}
                />
              </Col>
            </Row>
          </Container>
        </Form>
      </>
    );
  }
}

export default UserForm;
