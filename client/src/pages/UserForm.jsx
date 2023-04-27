import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./UserForm.css";

function UserForm() {
  return (
    <>
      <h2 className="page-title">User Profile</h2>
      <Form className="form">
        <Image
          className="user-image"
          src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png"
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
                <Form.Control type="text" />
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
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Middle Name</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
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
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Col>
            <Col>
              {" "}
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Contact No</Form.Label>
                <Form.Control type="text" placeholder="+94123456789" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Button
                variant="success"
                as="input"
                type="submit"
                value="Save"
                className="button-submit"
              />
              <Button
                as="input"
                type="reset"
                value="Clear"
                className="button-reset"
              />
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
}

export default UserForm;
