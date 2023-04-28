import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import axios from "axios";
import { Buffer } from "buffer";
import "./UserForm.css";
import { toast } from "react-toastify";

class UserForm extends Component {
  state = {
    username: "",
    email: "",
    firstName: "",
    middleName: "",
    lastName: "",
    image: "",
    contentType: "",
    contactNumber: "",
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
      contactNumber: "",
    });
  };

  searchData = () => {
    let searchTerm = this.state.username;
    axios.get(`http://localhost:5000/api/users/${searchTerm}`).then(
      (response) => {
        this.setState({
          username: response.data.username ?? "",
          email: response.data.email ?? "",
          firstName: response.data.firstName ?? "",
          middleName: response.data.middleName ?? "",
          lastName: response.data.lastName ?? "",
          contactNumber: response.data.contactNumber ?? "",
        });
        axios
          .get(`http://localhost:5000/api/files/${this.state.username}`)
          .then(
            (response) => {
              this.setState({
                image:
                  `data:${response.data.contentType};base64,${Buffer.from(
                    response.data.data
                  ).toString("base64")}` ?? "",
                contentType: response.data.contentType ?? "",
              });
            },
            (error) => {
              toast.info("User does not exist");
            }
          );
      },
      (error) => {
        toast.info("User does not exist");
      }
    );
  };

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
        if (file === null || file === "") {
          toast.info("User details saved");
          return;
        }
        let formData = new FormData();
        formData.append("file", file);
        formData.append("title", file.name);
        formData.append("identifier", this.state.username);
        axios
          .post(`http://localhost:5000/api/files/`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(
            (response) => {
              this.clearInputs();
              toast.info("User details saved");
            },
            (error) => {
              toast.error("An error occurred");
            }
          );
      },
      (error) => {
        toast.error("An error occurred");
      }
    );
  };
  render() {
    return (
      <>
        <h2 className="page-title">User Profile</h2>
        <Form className="form">
          <Image className="user-image" src={this.state.image} roundedCircle />
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
                  <Button
                    as="input"
                    type="button"
                    value="Search"
                    className="button-search"
                    onClick={this.searchData}
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
